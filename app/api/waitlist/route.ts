import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import crypto from 'crypto';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import ConfirmWaitlist from '@/emails/ConfirmWaitlist';

const resend = new Resend(process.env.RESEND_API_KEY!);
const APP_URL = process.env.APP_URL || 'https://allerlens.app'; // Fallback if not set, but better to set env var

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (jsonError) {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }
    const { email, phone, utm_source, utm_medium, utm_campaign, ref, smsOptIn } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // idempotency: find existing
    const existing = await sql`
      SELECT id, status FROM waitlist WHERE email = ${email} LIMIT 1
    ` as any[];

    // fresh token
    const token = crypto.randomBytes(24).toString('base64url');
    const tokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 48); // 48h

    let id: number;

    if (existing.length) {
      id = existing[0].id;
      // if previously unsubscribed, allow re-subscribe
      await sql`
        UPDATE waitlist
        SET status = 'pending',
            confirm_token = ${token},
            token_expires = ${tokenExpires},
            phone = COALESCE(${phone}, phone),
            sms_opt_in = ${!!smsOptIn},
            ip = ${req.headers.get('x-forwarded-for') || null},
            user_agent = ${req.headers.get('user-agent') || null}
        WHERE id = ${id}
      `;
    } else {
      const rows = await sql`
        INSERT INTO waitlist
          (email, phone, utm_source, utm_medium, utm_campaign, ref,
           status, confirm_token, token_expires, sms_opt_in, ip, user_agent)
        VALUES
          (${email}, ${phone ?? null}, ${utm_source ?? null}, ${utm_medium ?? null}, ${utm_campaign ?? null}, ${ref ?? null},
           'pending', ${token}, ${tokenExpires}, ${!!smsOptIn},
           ${req.headers.get('x-forwarded-for') ?? null}, ${req.headers.get('user-agent') ?? null})
        RETURNING id
      ` as any[];
      id = rows[0].id;
    }

    const confirmUrl = `${APP_URL}/api/waitlist/confirm?id=${id}&token=${encodeURIComponent(token)}`;

    // send confirmation email with nice design
    try {
      const emailHtml = await render(ConfirmWaitlist({ confirmUrl }));
      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: email,
        replyTo: process.env.RESEND_REPLY_TO,
        subject: 'Confirm your AllerLens sign-up',
        html: emailHtml,
        text: `Hi — please confirm you want waitlist updates for AllerLens.\n\nConfirm: ${confirmUrl}\n\nIf you didn't request this, ignore this email.`,
        headers: {
          // One-click unsubscribe not used on confirmation, add later for updates.
          'List-Id': 'AllerLens <waitlist.allerlens.app>'
        }
      });
    } catch (emailError) {
      console.error('Confirmation email failed:', emailError);
      // We still return success so the UI shows "Check your email"
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Waitlist API error:', error);
    
    // Check if it's a missing column error
    if (error?.code === '42703' || error?.message?.includes('does not exist')) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Database schema not initialized. Please visit /api/setup-db first.' 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
