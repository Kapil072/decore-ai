import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: 'Payment verification not configured' }, { status: 503 });
    }

    // HMAC-SHA256 verification
    const body      = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected  = crypto.createHmac('sha256', keySecret).update(body).digest('hex');
    const isValid   = expected === razorpay_signature;

    if (!isValid) {
      console.error('[Payment Verify] Signature mismatch', { razorpay_order_id, razorpay_payment_id });
      return NextResponse.json({ error: 'Payment signature verification failed' }, { status: 400 });
    }

    // Payment is genuine — in production, save order to DB here
    console.log('[Payment Success]', {
      orderId:   razorpay_order_id,
      paymentId: razorpay_payment_id,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success:   true,
      paymentId: razorpay_payment_id,
      message:   'Payment verified successfully',
    });
  } catch (err) {
    console.error('[Razorpay verify]', err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
