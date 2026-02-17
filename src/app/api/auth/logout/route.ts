import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/auth';

// POST /api/auth/logout — clears the session cookie
export async function POST() {
  await deleteSession();
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
