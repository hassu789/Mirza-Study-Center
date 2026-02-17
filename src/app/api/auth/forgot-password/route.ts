import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/mongodb';
import { forgotPasswordRequestSchema, forgotPasswordResetSchema, forgotPasswordDirectSchema } from '@/lib/schemas';
import { errorResponse, validationError, handleServerError } from '@/lib/api-utils';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

export const maxDuration = 10;

export async function POST(request: Request) {
  try {
    // Rate limit: 3 password reset requests per minute per IP
    const ip = getClientIP(request);
    const limit = rateLimit(`forgot:${ip}`, { maxRequests: 3, windowMs: 60_000 });
    if (!limit.allowed) {
      return errorResponse('Too many requests. Please wait a minute.', 429);
    }

    const body = await request.json();

    // Support two flows:
    // 1. Token-based: { token, newPassword } — verify token and reset
    // 2. Direct (legacy): { email, newPassword } — reset directly (kept for backward compatibility)

    if (body.token) {
      // Flow 1: Token-based reset
      const parsed = forgotPasswordResetSchema.safeParse(body);
      if (!parsed.success) return validationError(parsed.error);

      const { token, newPassword } = parsed.data;

      const { db } = await connectToDatabase();
      const tokensCollection = db.collection('password_reset_tokens');

      // Find valid, non-expired token
      const tokenDoc = await tokensCollection.findOne({
        token,
        expiresAt: { $gt: new Date() },
        used: false,
      });

      if (!tokenDoc) {
        return errorResponse('Invalid or expired reset link. Please request a new one.', 400);
      }

      // Hash new password and update user
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.collection('users').updateOne(
        { email: tokenDoc.email },
        { $set: { password: hashedPassword, updatedAt: new Date() } }
      );

      // Mark token as used
      await tokensCollection.updateOne({ _id: tokenDoc._id }, { $set: { used: true } });

      return NextResponse.json({
        success: true,
        message: 'Password has been reset successfully. You can now login with your new password.',
      });
    }

    if (body.email && body.newPassword) {
      // Flow 2: Direct reset (backward compatible)
      const parsed = forgotPasswordDirectSchema.safeParse(body);
      if (!parsed.success) return validationError(parsed.error);

      const { email, newPassword } = parsed.data;

      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({ email });

      if (!user) {
        return errorResponse('No account found with this email. Please sign up first.', 404);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.collection('users').updateOne(
        { email },
        { $set: { password: hashedPassword, updatedAt: new Date() } }
      );

      return NextResponse.json({
        success: true,
        message: 'Password has been reset successfully. You can now login with your new password.',
      });
    }

    if (body.email && !body.newPassword) {
      // Flow 3: Request a reset token (for future email integration)
      const parsed = forgotPasswordRequestSchema.safeParse(body);
      if (!parsed.success) return validationError(parsed.error);

      const { email } = parsed.data;

      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({ email });

      if (!user) {
        // Don't reveal whether email exists (security)
        return NextResponse.json({
          success: true,
          message: 'If an account with this email exists, a reset link has been sent.',
        });
      }

      // Generate token
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      await db.collection('password_reset_tokens').insertOne({
        email,
        token,
        expiresAt,
        used: false,
        createdAt: new Date(),
      });

      // TODO: Send email with reset link using Resend
      // const resetUrl = `${process.env.NEXT_PUBLIC_URL}/forgot-password?token=${token}`;
      // await sendResetEmail(email, resetUrl);

      return NextResponse.json({
        success: true,
        message: 'If an account with this email exists, a reset link has been sent.',
        // Remove this in production once email is set up:
        _devToken: process.env.NODE_ENV === 'development' ? token : undefined,
      });
    }

    return errorResponse('Invalid request. Provide email and/or newPassword.', 400);
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
