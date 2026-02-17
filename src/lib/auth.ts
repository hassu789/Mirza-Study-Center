import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

const SESSION_COOKIE = 'session';
const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('Please add AUTH_SECRET to .env.local (run: openssl rand -base64 32)');
  }
  return new TextEncoder().encode(secret);
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface SessionPayload {
  user: SessionUser;
  exp: number;
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .setIssuedAt()
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });

  return token;
}

export async function verifySession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await verifySession();
  return session?.user ?? null;
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireAuth();
  if (user.role !== 'admin') {
    throw new Error('Forbidden');
  }
  return user;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getUserFromDB(userId: string) {
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
  return user;
}
