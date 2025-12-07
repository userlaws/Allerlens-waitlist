import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import WaitlistWelcome from '@/emails/WaitlistWelcome';

const resend = new Resend(process.env.RESEND_API_KEY!);
const APP_URL = process.env.APP_URL || 'https://allerlens.app';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    const token = searchParams.get('token');

    if (!id || !token) {
      console.log('Missing id or token:', { id, token });
      return NextResponse.redirect(new URL('/confirm?confirmed=0', APP_URL));
    }

    const rows = await sql`
      SELECT email, confirm_token, token_expires, status FROM waitlist WHERE id = ${id} LIMIT 1
    ` as any[];

    if (!rows.length) {
      console.log('No user found with id:', id);
      return NextResponse.redirect(new URL('/confirm?confirmed=0', APP_URL));
    }

    const { email, confirm_token, token_expires, status } = rows[0];

    if (confirm_token !== token || new Date(token_expires) < new Date()) {
      console.log('Invalid or expired token:', { confirm_token, token, expires: token_expires });
      return NextResponse.redirect(new URL('/confirm?confirmed=0', APP_URL));
    }

    // Update status
    await sql`
      UPDATE waitlist
      SET status = 'subscribed', confirmed_at = NOW(), confirm_token = NULL, token_expires = NULL
      WHERE id = ${id}
    `;

    // Send the welcome email (WaitlistWelcome) now that they are confirmed
    // Only send if they weren't already subscribed (idempotency check basically)
    if (status !== 'subscribed') {
      try {
        const emailHtml = await render(WaitlistWelcome({ email, id }));
        await resend.emails.send({
          from: process.env.RESEND_FROM!,
          to: email,
          replyTo: process.env.RESEND_REPLY_TO,
          subject: "You're on the AllerLens waitlist ✅",
          html: emailHtml,
          headers: {
            'List-Unsubscribe': `<${APP_URL}/api/unsubscribe?id=${id}&email=${encodeURIComponent(email)}>, <mailto:unsubscribe@allerlens.app>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            'List-Id': 'AllerLens <waitlist.allerlens.app>'
          }
        });
      } catch (e) {
        console.error('Welcome email send failed:', e);
      }
    }

    return NextResponse.redirect(new URL('/confirm?confirmed=1', APP_URL));
  } catch (error) {
    console.error('Confirmation route error:', error);
    return NextResponse.redirect(new URL('/confirm?confirmed=0', APP_URL));
  }
}
