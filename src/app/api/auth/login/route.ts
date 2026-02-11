import { NextResponse } from 'next/server';

// Dummy users database (in real app, you would use a database like MongoDB, PostgreSQL, etc.)
const users = [
  { id: '1', username: 'admin', password: 'admin123', name: 'Admin User', email: 'admin@mirzastudycentre.com' },
  { id: '2', username: 'john', password: 'john123', name: 'John Doe', email: 'john@example.com' },
  { id: '3', username: 'demo', password: 'demo123', name: 'Demo User', email: 'demo@example.com' },
];

export async function POST(request: Request) {
  try {
    // Step 1: Get data from request body
    const body = await request.json();
    const { username, password } = body;

    // Step 2: Validate - check if username and password are provided
    if (!username || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Username and password are required' 
        },
        { status: 400 } // 400 = Bad Request
      );
    }

    // Step 3: Find user in database
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    // Step 4: If user not found, return error
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid username or password' 
        },
        { status: 401 } // 401 = Unauthorized
      );
    }

    // Step 5: Success! Return user data (never include password!)
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    // Step 6: Handle any unexpected errors
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Something went wrong. Please try again.' 
      },
      { status: 500 } // 500 = Server Error
    );
  }
}
