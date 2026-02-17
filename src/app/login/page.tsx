'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { images } from '@/data/images';
import { validateEmail, validatePassword } from '@/utils/validation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  // Real-time validation handlers
  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
    const validation = validateEmail(value);
    setErrors({ ...errors, email: validation.isValid ? undefined : validation.error });
  };

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value });
    const validation = validatePassword(value);
    setErrors({ ...errors, password: validation.isValid ? undefined : validation.error });
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    
    if (field === 'email') {
      const validation = validateEmail(formData.email);
      setErrors({ ...errors, email: validation.isValid ? undefined : validation.error });
    } else if (field === 'password') {
      const validation = validatePassword(formData.password);
      setErrors({ ...errors, password: validation.isValid ? undefined : validation.error });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate fields
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    const newErrors: { email?: string; password?: string } = {};
    if (!emailValidation.isValid) newErrors.email = emailValidation.error;
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ email: true, password: true });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/feed');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>
          <p className="text-slate-600 dark:text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={images.hero.students}
          alt="Students"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-violet-900/90 to-slate-900/95"></div>
      </div>
      
      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <AnimatedSection animation="fade-up">
          {/* Logo */}
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
              <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
              <p className="mt-2 text-slate-300">Sign in to continue learning</p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-500/20 border border-red-500/30 p-4 text-center text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full rounded-xl border px-4 py-3 text-white placeholder-slate-400 backdrop-blur transition-all focus:bg-white/15 focus:outline-none focus:ring-2 ${
                    errors.email && touched.email
                      ? 'border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/20 bg-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-xs text-red-300">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-300">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <Link href="/forgot-password" className="text-xs text-violet-400 transition-colors hover:text-violet-300">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  className={`w-full rounded-xl border px-4 py-3 text-white placeholder-slate-400 backdrop-blur transition-all focus:bg-white/15 focus:outline-none focus:ring-2 ${
                    errors.password && touched.password
                      ? 'border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/20 bg-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-xs text-red-300">{errors.password}</p>
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
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-300">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-semibold text-violet-400 transition-colors hover:text-violet-300">
                  Sign up
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
