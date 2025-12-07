import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

const APP_URL = process.env.APP_URL || 'https://allerlens.app';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  const email = searchParams.get('email');

  if (!id || !email) {
    return NextResponse.redirect(new URL('/unsubscribe?success=0', APP_URL));
  }

  try {
    await sql`
      UPDATE waitlist
      SET status = 'unsubscribed', unsubscribed_at = NOW(), unsubscribed = TRUE
      WHERE id = ${id} AND email = ${email}
    `;

    return NextResponse.redirect(new URL('/unsubscribe?success=1', APP_URL));
  } catch (error) {
    console.error('Unsubscribe GET error:', error);
    return NextResponse.redirect(new URL('/unsubscribe?success=0', APP_URL));
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Since we only have email from the manual form, we update by email
    await sql`
      UPDATE waitlist 
      SET status = 'unsubscribed', unsubscribed_at = NOW(), unsubscribed = TRUE
      WHERE email = ${email}
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Unsubscribe POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
