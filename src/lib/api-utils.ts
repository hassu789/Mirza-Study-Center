import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

// Consistent error response for all API routes
export function errorResponse(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

// Handle Zod validation errors
export function validationError(error: ZodError) {
  const firstError = error.issues[0];
  return errorResponse(firstError.message, 400);
}

// Handle common MongoDB/server errors
export function handleServerError(error: unknown) {
  console.error('Server error:', error);
  const message = error instanceof Error ? error.message : '';

  if (
    message.includes('ECONNRESET') ||
    message.includes('ECONNREFUSED') ||
    message.includes('timed out')
  ) {
    return errorResponse('Unable to connect to database. Please try again later.', 503);
  }

  return errorResponse('Something went wrong. Please try again.', 500);
}
