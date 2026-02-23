import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { inquirySchema } from '@/lib/schemas';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, validationError, handleServerError } from '@/lib/api-utils';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { sendInquiryNotification } from '@/lib/mailer';

// POST /api/inquiry — Submit new inquiry (public)
export async function POST(request: Request) {
  try {
    // Rate limit: 3 inquiries per minute per IP
    const ip = getClientIP(request);
    const limit = rateLimit(`inquiry:${ip}`, { maxRequests: 3, windowMs: 60_000 });
    if (!limit.allowed) {
      return errorResponse('Too many submissions. Please wait a minute.', 429);
    }

    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { name, email, phone, studentClass, subject, message } = parsed.data;

    const { db } = await connectToDatabase();
    const collection = db.collection('inquiries');

    const newInquiry = {
      name,
      email,
      phone,
      class: studentClass,
      subject,
      message,
      createdAt: new Date(),
      status: 'new',
    };

    const result = await collection.insertOne(newInquiry);

    // Fire-and-forget: send admin email notification (never blocks the response)
    sendInquiryNotification({ name, email, phone, studentClass, subject, message })
      .catch((err) => console.error('[mailer] Failed to send inquiry email:', err));

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We will contact you within 24 hours.',
      inquiry: {
        id: result.insertedId.toString(),
        name: newInquiry.name,
        subject: newInquiry.subject,
      },
    });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

// GET /api/inquiry — Get all inquiries (admin only)
export async function GET() {
  try {
    // Require authenticated admin
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Please log in to access this resource.', 401);
    }
    if (user.role !== 'admin') {
      return errorResponse('You do not have permission to view inquiries.', 403);
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('inquiries');

    const inquiries = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray();

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

// PATCH /api/inquiry — Update inquiry status (admin only)
export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse('Please log in.', 401);
    if (user.role !== 'admin') return errorResponse('Admin access required.', 403);

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status || !['new', 'contacted', 'resolved'].includes(status)) {
      return errorResponse('Please provide a valid inquiry id and status (new/contacted/resolved).', 400);
    }

    const { db } = await connectToDatabase();
    const { ObjectId } = await import('mongodb');

    const result = await db.collection('inquiries').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return errorResponse('Inquiry not found.', 404);
    }

    return NextResponse.json({ success: true, message: 'Inquiry status updated.' });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
