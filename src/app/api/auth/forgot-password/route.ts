import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';

// ============================================
// FORGOT PASSWORD API - /api/auth/forgot-password
// Allows user to reset password if they know their email
// ============================================

export const maxDuration = 10;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, newPassword } = body;

    // Step 1: Validate fields
    if (!email || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Email and new password are required' },
        { status: 400 }
      );
    }

    // Step 2: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Step 3: Validate new password
    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Step 4: Connect to MongoDB
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Step 5: Find user by email
    const user = await usersCollection.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'No account found with this email. Please sign up first.' },
        { status: 404 }
      );
    }

    // Step 6: Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 7: Update password in database
    await usersCollection.updateOne(
      { email: email.toLowerCase().trim() },
      { $set: { password: hashedPassword, updatedAt: new Date() } }
    );

    console.log('Password reset for user:', user.email);

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.',
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
