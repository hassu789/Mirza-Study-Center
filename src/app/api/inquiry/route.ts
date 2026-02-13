import { NextResponse } from 'next/server';
import { StudentInquiry } from '@/data/courses';

// ============================================
// INQUIRY API - /api/inquiry
// For students to submit their details
// So coaching can contact them
//
// WHY MongoDB instead of in-memory array?
// - An in-memory array loses all data when the server restarts
// - MongoDB stores data permanently on disk (in the cloud)
// - Even after Vercel redeploys, your data is safe
// ============================================

// ============================================
// POST /api/inquiry - Submit new inquiry
// WHY POST? Because we are CREATING new data (sending data to the server)
// ============================================
export async function POST(request: Request) {
  try {
    // Step 1: Get data from the form the student submitted
    const body = await request.json();
    const { name, email, phone, studentClass, subject, message } = body;

    // Step 2: Validate required fields
    // WHY? To make sure the student filled all important fields
    // before we save to database
    if (!name || !email || !phone || !studentClass || !subject) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please fill all required fields (name, email, phone, class, subject)',
        },
        { status: 400 } // 400 = Bad Request (client sent incomplete data)
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

    // Step 4: Validate phone (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit phone number' },
        { status: 400 }
      );
    }

    // Step 5: Connect to MongoDB
    // WHY? We need a connection to the database before we can save anything
    const { db } = await connectToDatabase();

    // Step 6: Get the "inquiries" collection
    // WHY? A collection is like a table in MongoDB - it holds all inquiry documents
    // If it doesn't exist yet, MongoDB creates it automatically
    const collection = db.collection('inquiries');

    // Step 7: Create the inquiry document (what we'll save)
    const newInquiry = {
      name,
      email,
      phone,
      class: studentClass,
      subject,
      message: message || '',
      createdAt: new Date(),  // WHY Date object? MongoDB handles dates natively
      status: 'new',          // WHY status? So admin can track: new → contacted → resolved
    };

    // Step 8: Insert the inquiry into MongoDB
    // WHY insertOne? We're saving one document at a time
    // This is the key change: instead of pushing to an array, we save to MongoDB
    const result = await collection.insertOne(newInquiry);

    console.log('New inquiry saved to MongoDB:', result.insertedId);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We will contact you within 24 hours.',
      inquiry: {
        id: result.insertedId.toString(), // MongoDB generates a unique ID automatically
        name: newInquiry.name,
        subject: newInquiry.subject,
      },
    });

  } catch (error: unknown) {
    console.error('Inquiry error:', error);
    const errorMessage = error instanceof Error ? error.message : '';
    if (errorMessage.includes('ECONNRESET') || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('timed out')) {
      return NextResponse.json(
        { success: false, error: 'Unable to connect to database. If testing locally, please try on the deployed Vercel site.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to submit inquiry. Please try again.' },
      { status: 500 } // 500 = Server Error (something went wrong on our side)
    );
  }
}

// ============================================
// GET /api/inquiry - Get all inquiries (Admin)
// WHY GET? Because we are READING data (not creating or changing anything)
// ============================================
export async function GET() {
  try {
    // Step 1: Connect to MongoDB
    const { db } = await connectToDatabase();

    // Step 2: Get the "inquiries" collection
    const collection = db.collection('inquiries');

    // Step 3: Fetch all inquiries, newest first
    // WHY sort by createdAt: -1? So the latest inquiry appears at the top
    // WHY toArray()? MongoDB returns a cursor (lazy loader), toArray() gets all results
    const inquiries = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      inquiries: inquiries,
    });

  } catch (error: unknown) {
    console.error('Error fetching inquiries:', error);
    const errorMessage = error instanceof Error ? error.message : '';
    if (errorMessage.includes('ECONNRESET') || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('timed out')) {
      return NextResponse.json(
        { success: false, error: 'Unable to connect to database.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}
