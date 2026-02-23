import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { enrollSchema } from '@/lib/schemas';
import { getCurrentUser } from '@/lib/auth';
import { sendEnrollmentConfirmation } from '@/lib/mailer';
import { errorResponse, validationError, handleServerError } from '@/lib/api-utils';
import { courses } from '@/data/courses';

// POST /api/enroll — Enroll in a course (logged-in students only)
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Please log in to enroll.', 401);
    }

    const body = await request.json();
    const parsed = enrollSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { courseId } = parsed.data;

    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return errorResponse('Course not found.', 404);
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('enrollments');

    const existing = await collection.findOne({
      userId: new ObjectId(user.id),
      courseId,
    });

    if (existing) {
      return errorResponse('You are already enrolled in this course.', 409);
    }

    await collection.insertOne({
      userId: new ObjectId(user.id),
      courseId,
      enrolledAt: new Date(),
      progress: 0,
      status: 'active',
      paymentStatus: 'pending',
    });

    sendEnrollmentConfirmation({
      studentName: user.name,
      studentEmail: user.email,
      courseTitle: course.title,
      courseSchedule: course.schedule,
      courseInstructor: course.instructor,
    }).catch((err) => console.error('[mailer] Enrollment email failed:', err));

    return NextResponse.json({
      success: true,
      message: `Successfully enrolled in ${course.title}`,
    });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

// GET /api/enroll — Get current user's enrollments (with attendance)
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Please log in.', 401);
    }

    const { db } = await connectToDatabase();
    const enrollments = await db
      .collection('enrollments')
      .find({ userId: new ObjectId(user.id) })
      .sort({ enrolledAt: -1 })
      .toArray();

    // Get attendance summaries for all enrollments
    const enrollmentIds = enrollments.map((e) => e._id);
    const attAgg = await db
      .collection('attendance')
      .aggregate([
        { $match: { enrollmentId: { $in: enrollmentIds } } },
        {
          $group: {
            _id: '$enrollmentId',
            total: { $sum: 1 },
            present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          },
        },
      ])
      .toArray();

    const attMap = new Map(
      attAgg.map((a) => [a._id.toString(), { total: a.total, present: a.present }])
    );

    const enriched = enrollments.map((e) => {
      const course = courses.find((c) => c.id === e.courseId);
      const att = attMap.get(e._id.toString());
      return {
        _id: e._id.toString(),
        courseId: e.courseId,
        courseTitle: course?.title || 'Unknown Course',
        courseCategory: course?.category || '',
        courseLevel: course?.level || '',
        courseInstructor: course?.instructor || '',
        courseSchedule: course?.schedule || '',
        enrolledAt: e.enrolledAt,
        progress: e.progress,
        status: e.status,
        paymentStatus: e.paymentStatus,
        attendance: att
          ? { total: att.total, present: att.present, percentage: Math.round((att.present / att.total) * 100) }
          : { total: 0, present: 0, percentage: 0 },
      };
    });

    return NextResponse.json({ success: true, enrollments: enriched });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
