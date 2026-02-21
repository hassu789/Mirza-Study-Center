import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, handleServerError } from '@/lib/api-utils';
import { courses } from '@/data/courses';

// GET /api/admin/enrollments — List all enrollments (admin only)
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse('Unauthorized', 401);
    if (user.role !== 'admin') return errorResponse('Forbidden', 403);

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status');

    const { db } = await connectToDatabase();

    const query: Record<string, unknown> = {};
    if (courseId) query.courseId = courseId;
    if (status) query.status = status;

    const enrollments = await db
      .collection('enrollments')
      .find(query)
      .sort({ enrolledAt: -1 })
      .toArray();

    // Get all unique userIds and fetch user names
    const userIds = [...new Set(enrollments.map((e) => e.userId.toString()))];
    const users = await db
      .collection('users')
      .find(
        { _id: { $in: userIds.map((id) => new ObjectId(id)) } },
        { projection: { name: 1, email: 1 } }
      )
      .toArray();

    const userMap = new Map(users.map((u) => [u._id.toString(), u]));

    const enriched = enrollments.map((e) => {
      const u = userMap.get(e.userId.toString());
      const course = courses.find((c) => c.id === e.courseId);
      return {
        _id: e._id.toString(),
        userId: e.userId.toString(),
        studentName: u?.name || 'Unknown',
        studentEmail: u?.email || '',
        courseId: e.courseId,
        courseTitle: course?.title || 'Unknown',
        courseCategory: course?.category || '',
        enrolledAt: e.enrolledAt,
        progress: e.progress,
        status: e.status,
        paymentStatus: e.paymentStatus,
      };
    });

    return NextResponse.json({ success: true, enrollments: enriched });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

// PATCH /api/admin/enrollments — Update enrollment progress/status/payment (admin only)
export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse('Unauthorized', 401);
    if (user.role !== 'admin') return errorResponse('Forbidden', 403);

    const body = await request.json();
    const { enrollmentId, progress, status, paymentStatus } = body;

    if (!enrollmentId) return errorResponse('Enrollment ID is required', 400);

    const update: Record<string, unknown> = {};
    if (progress !== undefined) {
      const p = Number(progress);
      if (isNaN(p) || p < 0 || p > 100) return errorResponse('Progress must be 0-100', 400);
      update.progress = p;
    }
    if (status !== undefined) {
      if (!['active', 'completed'].includes(status)) return errorResponse('Invalid status', 400);
      update.status = status;
    }
    if (paymentStatus !== undefined) {
      if (!['pending', 'paid'].includes(paymentStatus)) return errorResponse('Invalid payment status', 400);
      update.paymentStatus = paymentStatus;
    }

    if (Object.keys(update).length === 0) {
      return errorResponse('Nothing to update', 400);
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('enrollments').updateOne(
      { _id: new ObjectId(enrollmentId) },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return errorResponse('Enrollment not found', 404);
    }

    return NextResponse.json({ success: true, message: 'Enrollment updated.' });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
