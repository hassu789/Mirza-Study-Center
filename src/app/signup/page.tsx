'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { images } from '@/data/images';
import { validateName, validateEmail, validatePassword, validateConfirmPassword } from '@/utils/validation';

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Redirect if already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const username = localStorage.getItem('username');
    if (isAuthenticated === 'true' && username) {
      router.push('/feed');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  // Real-time validation handlers
  const handleNameChange = (value: string) => {
    setFormData({ ...formData, name: value });
    const validation = validateName(value);
    setErrors({ ...errors, name: validation.isValid ? undefined : validation.error });
  };

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
    const validation = validateEmail(value);
    setErrors({ ...errors, email: validation.isValid ? undefined : validation.error });
  };

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value });
    const validation = validatePassword(value);
    setErrors({ ...errors, password: validation.isValid ? undefined : validation.error });
    
    // Also validate confirm password if it's been touched
    if (touched.confirmPassword) {
      const confirmValidation = validateConfirmPassword(value, formData.confirmPassword);
      setErrors({ ...errors, password: validation.isValid ? undefined : validation.error, confirmPassword: confirmValidation.isValid ? undefined : confirmValidation.error });
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setFormData({ ...formData, confirmPassword: value });
    const validation = validateConfirmPassword(formData.password, value);
    setErrors({ ...errors, confirmPassword: validation.isValid ? undefined : validation.error });
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    
    // Validate on blur
    switch (field) {
      case 'name':
        const nameValidation = validateName(formData.name);
        setErrors({ ...errors, name: nameValidation.isValid ? undefined : nameValidation.error });
        break;
      case 'email':
        const emailValidation = validateEmail(formData.email);
        setErrors({ ...errors, email: emailValidation.isValid ? undefined : emailValidation.error });
        break;
      case 'password':
        const passwordValidation = validatePassword(formData.password);
        setErrors({ ...errors, password: passwordValidation.isValid ? undefined : passwordValidation.error });
        break;
      case 'confirmPassword':
        const confirmValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
        setErrors({ ...errors, confirmPassword: confirmValidation.isValid ? undefined : confirmValidation.error });
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate all fields
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmValidation = validateConfirmPassword(formData.password, formData.confirmPassword);

    const newErrors: FieldErrors = {};
    if (!nameValidation.isValid) newErrors.name = nameValidation.error;
    if (!emailValidation.isValid) newErrors.email = emailValidation.error;
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.error;
    if (!confirmValidation.isValid) newErrors.confirmPassword = confirmValidation.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, password: true, confirmPassword: true });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Set authentication state consistently
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', data.user.name || data.user.email);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/feed');
      } else {
        setError(data.error || 'Registration failed');
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-12">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={images.hero.classroom}
          alt="Classroom"
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
              <h1 className="text-2xl font-bold text-white">Create Account</h1>
              <p className="mt-2 text-slate-300">Start your learning journey today</p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-500/20 border border-red-500/30 p-4 text-center text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`w-full rounded-xl border px-4 py-3 text-white placeholder-slate-400 backdrop-blur transition-all focus:bg-white/15 focus:outline-none focus:ring-2 ${
                    errors.name && touched.name
                      ? 'border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/20 bg-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && touched.name && (
                  <p className="mt-1 text-xs text-red-300">{errors.name}</p>
                )}
              </div>

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
                  placeholder="john@example.com"
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-xs text-red-300">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password <span className="text-red-400">*</span>
                </label>
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
                  placeholder="••••••••"
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-xs text-red-300">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`w-full rounded-xl border px-4 py-3 text-white placeholder-slate-400 backdrop-blur transition-all focus:bg-white/15 focus:outline-none focus:ring-2 ${
                    errors.confirmPassword && touched.confirmPassword
                      ? 'border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/20 bg-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                  }`}
                  placeholder="••••••••"
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
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-300">
                Already have an account?{' '}
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
