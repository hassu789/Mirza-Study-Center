import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { loginSchema } from '@/lib/schemas';
import { createSession } from '@/lib/auth';
import { errorResponse, validationError, handleServerError } from '@/lib/api-utils';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { logActivity } from '@/lib/logger';

export const maxDuration = 10;

export async function POST(request: Request) {
  try {
    // Rate limit: 5 login attempts per minute per IP
    const ip = getClientIP(request);
    const limit = rateLimit(`login:${ip}`, { maxRequests: 5, windowMs: 60_000 });
    if (!limit.allowed) {
      return errorResponse('Too many login attempts. Please wait a minute.', 429);
    }

    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { email, password } = parsed.data;

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return errorResponse('No account found with this email. Please sign up first.', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse('Incorrect password. Please try again.', 401);
    }

    // Create server-side session (HTTP-only cookie)
    await createSession({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role || 'user',
    });

    logActivity({
      action: 'user.login',
      userId: user._id.toString(),
      userEmail: user.email,
      ip,
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role || 'user',
      },
    });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
