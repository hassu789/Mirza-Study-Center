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

    const matchStage: Record<string, unknown> = {};
    if (search) {
      matchStage.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const [aggResult, total] = await Promise.all([
      db
        .collection('users')
        .aggregate([
          { $match: Object.keys(matchStage).length ? matchStage : {} },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
          { $project: { password: 0 } },
          {
            $lookup: {
              from: 'enrollments',
              localField: '_id',
              foreignField: 'userId',
              as: 'enrollments',
            },
          },
          {
            $project: {
              id: { $toString: '$_id' },
              name: 1,
              email: 1,
              role: 1,
              createdAt: 1,
              enrollmentCount: { $size: '$enrollments' },
            },
          },
        ])
        .toArray(),
      db.collection('users').countDocuments(Object.keys(matchStage).length ? matchStage : {}),
    ]);

    const enriched = aggResult.map((s: { id?: string; name: string; email: string; role?: string; createdAt?: Date; enrollmentCount?: number }) => ({
      id: s.id || '',
      name: s.name,
      email: s.email,
      role: s.role || 'user',
      createdAt: s.createdAt,
      enrollmentCount: s.enrollmentCount ?? 0,
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
