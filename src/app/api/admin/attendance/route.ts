import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, handleServerError } from '@/lib/api-utils';

// POST /api/admin/attendance — Mark attendance for a date (admin only)
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse('Unauthorized', 401);
    if (user.role !== 'admin') return errorResponse('Forbidden', 403);

    const body = await request.json();
    const { enrollmentId, date, status } = body;

    if (!enrollmentId || !date || !status) {
      return errorResponse('enrollmentId, date, and status are required', 400);
    }
    if (!['present', 'absent'].includes(status)) {
      return errorResponse('Status must be "present" or "absent"', 400);
    }

    const { db } = await connectToDatabase();

    // Verify enrollment exists
    const enrollment = await db.collection('enrollments').findOne({ _id: new ObjectId(enrollmentId) });
    if (!enrollment) return errorResponse('Enrollment not found', 404);

    const dateStr = new Date(date).toISOString().split('T')[0]; // normalize to YYYY-MM-DD

    // Upsert attendance (create or update for that day)
    await db.collection('attendance').updateOne(
      { enrollmentId: new ObjectId(enrollmentId), date: dateStr },
      {
        $set: {
          enrollmentId: new ObjectId(enrollmentId),
          date: dateStr,
          status,
          markedBy: new ObjectId(user.id),
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: `Attendance marked as ${status}` });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

// GET /api/admin/attendance?enrollmentId=xxx — Get attendance records
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse('Unauthorized', 401);

    const { searchParams } = new URL(request.url);
    const enrollmentId = searchParams.get('enrollmentId');

    if (!enrollmentId) return errorResponse('enrollmentId is required', 400);

    const { db } = await connectToDatabase();

    // Non-admins can only see their own enrollment attendance
    if (user.role !== 'admin') {
      const enrollment = await db.collection('enrollments').findOne({
        _id: new ObjectId(enrollmentId),
        userId: new ObjectId(user.id),
      });
      if (!enrollment) return errorResponse('Enrollment not found', 404);
    }

    const records = await db
      .collection('attendance')
      .find({ enrollmentId: new ObjectId(enrollmentId) })
      .sort({ date: -1 })
      .toArray();

    const total = records.length;
    const present = records.filter((r) => r.status === 'present').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return NextResponse.json({
      success: true,
      attendance: records.map((r) => ({
        _id: r._id.toString(),
        date: r.date,
        status: r.status,
      })),
      summary: { total, present, absent: total - present, percentage },
    });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
