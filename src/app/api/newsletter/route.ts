import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getClientIP } from '@/lib/rate-limit';
import { rateLimit } from '@/lib/rate-limit';

// POST /api/newsletter — Subscribe email (public)
export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);
    const limit = rateLimit(`newsletter:${ip}`, { maxRequests: 3, windowMs: 60_000 });
    if (!limit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('newsletter');

    try {
      await collection.insertOne({
        email,
        subscribedAt: new Date(),
      });
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? (err as { code?: number }).code : 0;
      if (code === 11000) {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed!',
        });
      }
      throw err;
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing!',
    });
  } catch (error) {
    console.error('[newsletter] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
