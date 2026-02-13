import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';

// ============================================
// LOGIN API - /api/auth/login
// Validates user credentials against MongoDB
// ============================================

export const maxDuration = 10;

export async function POST(request: Request) {
  try {
    // Step 1: Get data from request
    const body = await request.json();
    const { email, password } = body;

    // Step 2: Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Step 3: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
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
        { status: 401 }
      );
    }

    // Step 6: Compare password with stored hash
    // WHY bcrypt.compare? It checks if the plain password matches the hashed version
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    // Step 7: Success - return user data (never include password!)
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });

  } catch (error: unknown) {
    console.error('Login error:', error);
    // Check if it's a MongoDB connection error
    const errorMessage = error instanceof Error ? error.message : '';
    if (errorMessage.includes('ECONNRESET') || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('timed out')) {
      return NextResponse.json(
        { success: false, error: 'Unable to connect to database. If testing locally, please try on the deployed Vercel site.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
