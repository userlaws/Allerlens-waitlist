import { sql } from '@/lib/db';

export async function GET() {
  try {
    
    // Update the waitlist table with new columns
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        unsubscribed BOOLEAN DEFAULT FALSE
      );
    `;

    // Add new columns if they don't exist
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending'`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS confirm_token text`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS token_expires timestamptz`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS confirmed_at timestamptz`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS unsubscribed_at timestamptz`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS email_opt_in boolean DEFAULT true`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS sms_opt_in boolean DEFAULT false`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS ip inet`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS user_agent text`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS utm_source text`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS utm_medium text`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS utm_campaign text`;
    await sql`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS ref text`;

    // Add index on status
    await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status)`;

    return Response.json({ message: 'Table "waitlist" updated with new schema.' });
  } catch (error) {
    console.error('Database setup error:', error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
