import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { updateProfileSchema, changePasswordSchema } from '@/lib/schemas';
import { getCurrentUser, createSession } from '@/lib/auth';
import { errorResponse, validationError, handleServerError } from '@/lib/api-utils';

// GET /api/profile — Get current user's profile + enrollment count
export async function GET() {
  try {
    const sessionUser = await getCurrentUser();
    if (!sessionUser) return errorResponse('Please log in.', 401);

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(sessionUser.id) },
      { projection: { password: 0 } }
    );

    if (!user) return errorResponse('User not found.', 404);

    const enrollmentCount = await db
      .collection('enrollments')
      .countDocuments({ userId: new ObjectId(sessionUser.id) });

    const inquiryCount = await db
      .collection('inquiries')
      .countDocuments({ email: user.email });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        createdAt: user.createdAt,
      },
      stats: { enrollmentCount, inquiryCount },
    });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}

// PATCH /api/profile — Update name
export async function PATCH(request: Request) {
  try {
    const sessionUser = await getCurrentUser();
    if (!sessionUser) return errorResponse('Please log in.', 401);

    const body = await request.json();

    // Handle password change
    if (body.currentPassword !== undefined) {
      const parsed = changePasswordSchema.safeParse(body);
      if (!parsed.success) return validationError(parsed.error);

      const { currentPassword, newPassword } = parsed.data;
      const { db } = await connectToDatabase();

      const user = await db.collection('users').findOne({ _id: new ObjectId(sessionUser.id) });
      if (!user) return errorResponse('User not found.', 404);

      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) return errorResponse('Current password is incorrect.', 400);

      const hashed = await bcrypt.hash(newPassword, 10);
      await db.collection('users').updateOne(
        { _id: new ObjectId(sessionUser.id) },
        { $set: { password: hashed } }
      );

      return NextResponse.json({ success: true, message: 'Password updated successfully.' });
    }

    // Handle name update
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { name } = parsed.data;
    const { db } = await connectToDatabase();

    await db.collection('users').updateOne(
      { _id: new ObjectId(sessionUser.id) },
      { $set: { name } }
    );

    // Refresh the session with new name
    await createSession({ ...sessionUser, name });

    return NextResponse.json({ success: true, message: 'Profile updated successfully.' });
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
