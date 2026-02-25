import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { logActivity } from '@/lib/logger';
import { errorResponse, handleServerError } from '@/lib/api-utils';
import { getClientIP } from '@/lib/rate-limit';
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

    const matchStage: Record<string, unknown> = {};
    if (courseId) matchStage.courseId = courseId;
    if (status) matchStage.status = status;

    const raw = await db
      .collection('enrollments')
      .aggregate([
        { $match: Object.keys(matchStage).length ? matchStage : {} },
        { $sort: { enrolledAt: -1 } },
        { $limit: 1000 },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
            pipeline: [{ $project: { name: 1, email: 1 } }],
          },
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      ])
      .toArray();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const enriched = raw.map((e: any) => {
      const course = courses.find((c) => c.id === e.courseId);
      return {
        _id: e._id.toString(),
        userId: e.userId.toString(),
        studentName: e.user?.name || 'Unknown',
        studentEmail: e.user?.email || '',
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

    logActivity({
      action: 'enrollment.update',
      userId: user.id,
      userEmail: user.email,
      metadata: { enrollmentId, ...update },
      ip: getClientIP(request),
    }).catch(() => {});

    return NextResponse.json({ success: true, message: 'Enrollment updated.' });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
