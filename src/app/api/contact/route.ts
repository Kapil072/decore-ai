import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    // Log the contact request (in production, send email or save to DB)
    console.log('[Contact Form]', {
      name, phone, email, message,
      timestamp: new Date().toISOString(),
    });

    // In production you would:
    // 1. Send email via nodemailer / Resend / SendGrid
    // 2. Save to a database
    // 3. Send WhatsApp notification via Twilio / MSG91

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will respond within 2 hours.',
    });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
