'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { images } from '@/data/images';
import { validateEmail, validatePassword, validateConfirmPassword } from '@/utils/validation';

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ email?: string; newPassword?: string; confirmPassword?: string }>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    if (field === 'email') {
      const v = validateEmail(formData.email);
      setErrors((prev) => ({ ...prev, email: v.isValid ? undefined : v.error }));
    } else if (field === 'newPassword') {
      const v = validatePassword(formData.newPassword);
      setErrors((prev) => ({ ...prev, newPassword: v.isValid ? undefined : v.error }));
    } else if (field === 'confirmPassword') {
      const v = validateConfirmPassword(formData.newPassword, formData.confirmPassword);
      setErrors((prev) => ({ ...prev, confirmPassword: v.isValid ? undefined : v.error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.newPassword);
    const confirmValidation = validateConfirmPassword(formData.newPassword, formData.confirmPassword);

    const newErrors: typeof errors = {};
    if (!emailValidation.isValid) newErrors.email = emailValidation.error;
    if (!passwordValidation.isValid) newErrors.newPassword = passwordValidation.error;
    if (!confirmValidation.isValid) newErrors.confirmPassword = confirmValidation.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ email: true, newPassword: true, confirmPassword: true });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setFormData({ email: '', newPassword: '', confirmPassword: '' });
        setErrors({});
        setTouched({});
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image src={images.hero.library} alt="Library" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-violet-900/90 to-slate-900/95"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <AnimatedSection animation="fade-up">
          <div className="mb-6 text-center sm:mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-white sm:text-2xl">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-sm shadow-lg sm:h-10 sm:w-10">
                📚
              </span>
              Mirza Study Centre
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-white">Reset Password</h1>
              <p className="mt-2 text-slate-300">Enter your email and set a new password</p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-500/20 border border-red-500/30 p-4 text-center text-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-xl bg-green-500/20 border border-green-500/30 p-4 text-center text-green-200">
                {success}
                <Link href="/login" className="mt-2 block font-semibold text-violet-400 hover:text-violet-300">
                  Go to Login →
                </Link>
              </div>
            )}

            {!success && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      const v = validateEmail(e.target.value);
                      setErrors({ ...errors, email: v.isValid ? undefined : v.error });
                    }}
                    onBlur={() => handleBlur('email')}
                    className={`w-full rounded-xl border px-4 py-3 text-white placeholder-slate-400 backdrop-blur transition-all focus:bg-white/15 focus:outline-none focus:ring-2 ${
                      errors.email && touched.email
                        ? 'border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-white/20 bg-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                    }`}
                    placeholder="Enter your registered email"
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-xs text-red-300">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    New Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.newPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, newPassword: e.target.value });
                      const v = validatePassword(e.target.value);
                      setErrors({ ...errors, newPassword: v.isValid ? undefined : v.error });
                    }}
                    onBlur={() => handleBlur('newPassword')}
                    className={`w-full rounded-xl border px-4 py-3 text-white placeholder-slate-400 backdrop-blur transition-all focus:bg-white/15 focus:outline-none focus:ring-2 ${
                      errors.newPassword && touched.newPassword
                        ? 'border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-white/20 bg-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                    }`}
                    placeholder="Enter new password (min 6 characters)"
                  />
                  {errors.newPassword && touched.newPassword && (
                    <p className="mt-1 text-xs text-red-300">{errors.newPassword}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Confirm New Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      const v = validateConfirmPassword(formData.newPassword, e.target.value);
                      setErrors({ ...errors, confirmPassword: v.isValid ? undefined : v.error });
                    }}
                    onBlur={() => handleBlur('confirmPassword')}
                    className={`w-full rounded-xl border px-4 py-3 text-white placeholder-slate-400 backdrop-blur transition-all focus:bg-white/15 focus:outline-none focus:ring-2 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-white/20 bg-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                    }`}
                    placeholder="Confirm your new password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="mt-1 text-xs text-red-300">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Resetting...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-slate-300">
                Remember your password?{' '}
                <Link href="/login" className="font-semibold text-violet-400 transition-colors hover:text-violet-300">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              ← Back to Home
            </Link>
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
