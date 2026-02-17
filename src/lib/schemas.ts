import { z } from 'zod';

// Reusable field validators
const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .email('Please enter a valid email address');

const passwordField = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .max(50, 'Password must be less than 50 characters');

const nameField = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

const phoneField = z
  .string()
  .transform((val) => val.replace(/\D/g, ''))
  .pipe(
    z.string().length(10, 'Phone number must be exactly 10 digits')
  );

// Auth schemas
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
});

export const forgotPasswordRequestSchema = z.object({
  email: emailField,
});

export const forgotPasswordResetSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: passwordField,
});

// For backward compatibility (direct reset without token)
export const forgotPasswordDirectSchema = z.object({
  email: emailField,
  newPassword: passwordField,
});

// Inquiry schema
export const inquirySchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  studentClass: z.string().min(1, 'Please select a class'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().optional().default(''),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
