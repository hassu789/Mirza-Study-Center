import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Routes that require authentication
const protectedRoutes = ["/feed", "/admin"];

// Routes that should redirect to /feed if already authenticated
const authRoutes = ["/login", "/signup"];

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function verifyToken(token: string) {
  try {
    const key = getSecretKey();
    if (!key) return null;
    const { payload } = await jwtVerify(token, key);
    return payload as {
      user: { id: string; name: string; email: string; role: string };
    };
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("session")?.value;

  const session = sessionToken ? await verifyToken(sessionToken) : null;
  const isAuthenticated = !!session;

  // Protect routes: redirect to login if not authenticated
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Admin routes require admin role
    if (pathname.startsWith("/admin") && session?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  }

  // Auth routes: redirect to feed if already authenticated
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/feed/:path*", "/admin/:path*", "/login", "/signup"],
};
