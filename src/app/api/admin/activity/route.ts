import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, handleServerError } from '@/lib/api-utils';

// GET /api/admin/activity — List recent activity logs (admin only)
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse('Unauthorized', 401);
    if (user.role !== 'admin') return errorResponse('Forbidden', 403);

    const { db } = await connectToDatabase();
    const logs = await db
      .collection('activity_logs')
      .find({})
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();

    const formatted = logs.map((log) => ({
      _id: log._id.toString(),
      action: log.action,
      userId: log.userId ?? null,
      userEmail: log.userEmail ?? null,
      metadata: log.metadata ?? {},
      ip: log.ip ?? null,
      createdAt: log.createdAt,
    }));

    return NextResponse.json({
      success: true,
      count: formatted.length,
      logs: formatted,
    });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
