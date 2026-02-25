import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { signupSchema } from '@/lib/schemas';
import { createSession } from '@/lib/auth';
import { errorResponse, validationError, handleServerError } from '@/lib/api-utils';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { logActivity } from '@/lib/logger';

export const maxDuration = 10;

export async function POST(request: Request) {
  try {
    // Rate limit: 3 signups per minute per IP
    const ip = getClientIP(request);
    const limit = rateLimit(`signup:${ip}`, { maxRequests: 3, windowMs: 60_000 });
    if (!limit.allowed) {
      return errorResponse('Too many signup attempts. Please wait a minute.', 429);
    }

    const body = await request.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { name, email, password } = parsed.data;

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Check if email already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return errorResponse('An account with this email already exists. Please login instead.', 409);
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
    });

    // Auto-login after signup (set session cookie)
    await createSession({
      id: result.insertedId.toString(),
      name,
      email,
      role: 'user',
    });

    logActivity({
      action: 'user.signup',
      userId: result.insertedId.toString(),
      userEmail: email,
      ip,
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: result.insertedId.toString(),
        name,
        email,
        role: 'user',
      },
    });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
