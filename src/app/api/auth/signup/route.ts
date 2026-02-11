import { NextResponse } from 'next/server';

// ============================================
// SIGNUP API - /api/auth/signup
// ============================================
// This API handles user registration
// Method: POST
// Body: { name, email, password }
// ============================================

// Dummy database (in real app, use actual database like PostgreSQL)
// This array simulates a database table
const users: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}> = [
  // Pre-existing users (same as login API)
  { id: '1', name: 'Admin User', email: 'admin@mirzastudycentre.com', password: 'admin123', createdAt: '2024-01-01' },
  { id: '2', name: 'John Doe', email: 'john@example.com', password: 'john123', createdAt: '2024-01-15' },
];

// POST function handles POST requests to /api/auth/signup
export async function POST(request: Request) {
  try {
    // ==========================================
    // STEP 1: Get data from request body
    // ==========================================
    const body = await request.json();
    const { name, email, password } = body;

    // ==========================================
    // STEP 2: Validate required fields
    // ==========================================
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required (name, email, password)',
        },
        { status: 400 } // 400 = Bad Request
      );
    }

    // ==========================================
    // STEP 3: Validate email format
    // ==========================================
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please enter a valid email address',
        },
        { status: 400 }
      );
    }

    // ==========================================
    // STEP 4: Validate password strength
    // ==========================================
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 6 characters long',
        },
        { status: 400 }
      );
    }

    // ==========================================
    // STEP 5: Check if user already exists
    // ==========================================
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'An account with this email already exists',
        },
        { status: 409 } // 409 = Conflict
      );
    }

    // ==========================================
    // STEP 6: Create new user
    // ==========================================
    const newUser = {
      id: String(users.length + 1), // Generate simple ID
      name: name,
      email: email,
      password: password, // In real app: hash with bcrypt!
      createdAt: new Date().toISOString(),
    };

    // Add to our "database" (in real app: save to actual database)
    users.push(newUser);

    // ==========================================
    // STEP 7: Return success response
    // ==========================================
    // Never return the password in response!
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });

  } catch (error) {
    // ==========================================
    // STEP 8: Handle unexpected errors
    // ==========================================
    console.error('Signup error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again.',
      },
      { status: 500 } // 500 = Server Error
    );
  }
}
