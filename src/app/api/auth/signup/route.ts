import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';

// ============================================
// SIGNUP API - /api/auth/signup
// Saves user to MongoDB with hashed password
// ============================================

export const maxDuration = 10;

export async function POST(request: Request) {
  try {
    // Step 1: Get data from request
    const body = await request.json();
    const { name, email, password } = body;

    // Step 2: Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required (name, email, password)' },
        { status: 400 }
      );
    }

    // Step 3: Validate name (no numbers)
    if (/\d/.test(name)) {
      return NextResponse.json(
        { success: false, error: 'Name cannot contain numbers' },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Step 4: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Step 5: Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Step 6: Connect to MongoDB
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Step 7: Check if email already exists
    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists. Please login instead.' },
        { status: 409 }
      );
    }

    // Step 8: Hash the password
    // WHY? Never store passwords in plain text. bcrypt creates a one-way hash.
    // Even if someone sees the database, they can't read the actual password.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 9: Save user to MongoDB
    const result = await usersCollection.insertOne({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log('New user registered:', result.insertedId);

    // Step 10: Return success (never return the password!)
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: result.insertedId.toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
      },
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
