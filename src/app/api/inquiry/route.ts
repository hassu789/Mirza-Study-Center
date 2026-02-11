import { NextResponse } from 'next/server';
import { StudentInquiry } from '@/data/courses';

// ============================================
// INQUIRY API - /api/inquiry
// For students to submit their details
// So coaching can contact them
// ============================================

// In-memory storage for inquiries (use database in production)
const inquiries: StudentInquiry[] = [];

// ============================================
// POST /api/inquiry - Submit new inquiry
// ============================================
export async function POST(request: Request) {
  try {
    // Get data from request
    const body = await request.json();
    const { name, email, phone, studentClass, subject, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !studentClass || !subject) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please fill all required fields (name, email, phone, class, subject)',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate phone (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit phone number' },
        { status: 400 }
      );
    }

    // Create new inquiry
    const newInquiry: StudentInquiry = {
      id: String(Date.now()),
      name,
      email,
      phone,
      class: studentClass,
      subject,
      message: message || '',
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    // Save inquiry (in real app, save to database)
    inquiries.push(newInquiry);

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to student

    console.log('New inquiry received:', newInquiry);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We will contact you within 24 hours.',
      inquiry: {
        id: newInquiry.id,
        name: newInquiry.name,
        subject: newInquiry.subject,
      },
    });

  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit inquiry. Please try again.' },
      { status: 500 }
    );
  }
}

// ============================================
// GET /api/inquiry - Get all inquiries (Admin)
// ============================================
export async function GET(request: Request) {
  try {
    // In production, add authentication check here
    // Only admin should access this

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      inquiries: inquiries,
    });

  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}
