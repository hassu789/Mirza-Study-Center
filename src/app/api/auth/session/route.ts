import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

// GET /api/auth/session — returns current user or null
export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  return NextResponse.json({ authenticated: true, user });
}
