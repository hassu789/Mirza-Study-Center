import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, handleServerError } from '@/lib/api-utils';

// GET /api/admin/students — List all students with enrollment counts (admin only)
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse('Unauthorized', 401);
    if (user.role !== 'admin') return errorResponse('Forbidden', 403);

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    const { db } = await connectToDatabase();

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const [students, total] = await Promise.all([
      db
        .collection('users')
        .find(query, { projection: { password: 0 } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection('users').countDocuments(query),
    ]);

    // Get enrollment counts for each student
    const studentIds = students.map((s) => s._id);
    const enrollmentCounts = await db
      .collection('enrollments')
      .aggregate([
        { $match: { userId: { $in: studentIds } } },
        { $group: { _id: '$userId', count: { $sum: 1 } } },
      ])
      .toArray();

    const countMap = new Map(enrollmentCounts.map((e) => [e._id.toString(), e.count]));

    const enriched = students.map((s) => ({
      id: s._id.toString(),
      name: s.name,
      email: s.email,
      role: s.role || 'user',
      createdAt: s.createdAt,
      enrollmentCount: countMap.get(s._id.toString()) || 0,
    }));

    return NextResponse.json({
      success: true,
      students: enriched,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
