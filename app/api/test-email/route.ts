import { Resend } from 'resend';

export const GET = async () => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const replyTo = process.env.RESEND_REPLY_TO;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'RESEND_API_KEY is not set' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!from) {
    return new Response(
      JSON.stringify({ error: 'RESEND_FROM is not set' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!replyTo) {
    return new Response(
      JSON.stringify({ error: 'RESEND_REPLY_TO is not set' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const resend = new Resend(apiKey);

    const res = await resend.emails.send({
      from,
      to: ['allerlens.app@gmail.com'],
      replyTo,
      subject: 'AllerLens test: your domain is set up',
      text: 'If you can read this, DKIM/SPF are working. Reply to test Reply-To.',
      headers: {
        'List-Unsubscribe': '<mailto:unsubscribe@allerlens.app>',
      },
      tags: [{ name: 'type', value: 'transactional' }],
    });

    return new Response(JSON.stringify(res), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};


