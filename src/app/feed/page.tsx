'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { theme, typo } from '@/styles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import { courses } from '@/data/courses';
import { courseImages, images } from '@/data/images';

interface User {
  id: string;
  name: string;
  email?: string;
  role?: string;
}

interface Enrollment {
  _id: string;
  courseId: string;
  courseTitle: string;
  courseCategory: string;
  courseLevel: string;
  courseInstructor: string;
  courseSchedule: string;
  enrolledAt: string;
  progress: number;
  status: string;
  paymentStatus: string;
  attendance: { total: number; present: number; percentage: number };
}

export default function FeedPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/session').then((r) => r.json()),
      fetch('/api/enroll').then((r) => r.json()),
    ])
      .then(([sessionData, enrollData]) => {
        if (sessionData.authenticated) {
          setUser(sessionData.user);
        }
        if (enrollData.enrollments) {
          setEnrollments(enrollData.enrollments);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-dark-950">
        <div className="text-center">
          <div className={`mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 ${theme.spinner}`} />
          <p className={theme.textBody}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const activeCourses = enrollments.filter((e) => e.status === 'active');
  const completedCourses = enrollments.filter((e) => e.status === 'completed');
  const avgProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
    : 0;
  const paidCount = enrollments.filter((e) => e.paymentStatus === 'paid').length;
  const pendingCount = enrollments.filter((e) => e.paymentStatus === 'pending').length;

  // Courses the user hasn't enrolled in yet
  const enrolledIds = new Set(enrollments.map((e) => e.courseId));
  const recommendedCourses = courses.filter((c) => !enrolledIds.has(c.id)).slice(0, 3);

  const stats = [
    { label: 'Enrolled', value: enrollments.length, icon: '📚', color: 'from-primary-500 to-primary-700' },
    { label: 'Active', value: activeCourses.length, icon: '📖', color: 'from-emerald-500 to-teal-600' },
    { label: 'Completed', value: completedCourses.length, icon: '🎓', color: 'from-amber-500 to-orange-600' },
    { label: 'Avg Progress', value: `${avgProgress}%`, icon: '📊', color: 'from-blue-500 to-cyan-600' },
  ];

  return (
    <div className={`flex min-h-screen flex-col ${theme.bgPage}`}>
      <Header />

      {/* Hero Section */}
      <section className={`relative overflow-hidden ${theme.gradientHero}`}>
        <div className="absolute inset-0">
          <Image src={images.features.studying} alt="Studying" fill className="object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 text-xs text-primary-300 sm:text-sm">Welcome back,</p>
                <h1 className={`${typo.h1} ${theme.textWhite} lg:text-4xl`}>{user.name}</h1>
                <p className="mt-1 text-sm text-slate-300 sm:mt-2 sm:text-base">
                  {enrollments.length > 0
                    ? `You have ${activeCourses.length} active course${activeCourses.length !== 1 ? 's' : ''}`
                    : 'Start your learning journey — enroll in a course!'}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:px-6 sm:py-3"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:px-6 sm:py-3"
                >
                  Logout
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <AnimatedCard key={stat.label} index={index} baseDelay={50} staggerDelay={50}>
                <div className={`flex items-center gap-3 rounded-2xl ${theme.borderCard} ${theme.bgCard} p-3 sm:gap-4 sm:p-4`}>
                  <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-lg shadow-lg sm:h-12 sm:w-12`}>
                    {stat.icon}
                  </span>
                  <div>
                    <p className={`${typo.stat} ${theme.textHeading} sm:text-2xl`}>{stat.value}</p>
                    <p className={`${typo.bodySmall} ${theme.textMuted}`}>{stat.label}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Left: Enrolled Courses */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection animation="fade-up">
                <div className={`rounded-2xl ${theme.borderCard} ${theme.bgCard} p-4 sm:p-6`}>
                  <h2 className={`mb-4 flex items-center gap-2 text-base font-semibold sm:text-lg ${theme.textHeading}`}>
                    <span className="text-xl">📚</span>
                    My Courses
                  </h2>

                  {enrollments.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className={`mb-4 ${theme.textMuted}`}>You haven&apos;t enrolled in any courses yet.</p>
                      <Link
                        href="/courses"
                        className={`inline-flex items-center gap-2 ${theme.btnPrimary} px-5 py-2.5 transition-all`}
                      >
                        Browse Courses
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {enrollments.map((enrollment) => (
                        <Link
                          key={enrollment._id}
                          href={`/courses/${enrollment.courseId}`}
                          className={`flex flex-col gap-3 rounded-xl ${theme.bgSubtle} p-3 transition-all hover:bg-slate-100 dark:hover:bg-dark-700 sm:flex-row sm:items-center sm:p-4`}
                        >
                          <div className="relative h-16 w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-14 sm:w-20">
                            <Image
                              src={courseImages[enrollment.courseId] || images.hero.classroom}
                              alt={enrollment.courseTitle}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`truncate text-sm font-semibold ${theme.textHeading}`}>
                              {enrollment.courseTitle}
                            </h3>
                            <p className={`text-xs ${theme.textMuted}`}>
                              {enrollment.courseInstructor} &bull; {enrollment.courseLevel}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-dark-700">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-700"
                                  style={{ width: `${enrollment.progress}%` }}
                                />
                              </div>
                              <span className={`text-xs font-semibold ${theme.textBody}`}>
                                {enrollment.progress}%
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:flex-col sm:items-end">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              enrollment.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {enrollment.status}
                            </span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              enrollment.paymentStatus === 'paid'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            }`}>
                              {enrollment.paymentStatus}
                            </span>
                            {enrollment.attendance.total > 0 && (
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                enrollment.attendance.percentage >= 75
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                  : enrollment.attendance.percentage >= 50
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}>
                                {enrollment.attendance.percentage}% att.
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* Recommended Courses */}
              {recommendedCourses.length > 0 && (
                <AnimatedSection animation="fade-up" delay={100}>
                  <div className={`rounded-2xl ${theme.borderCard} ${theme.bgCard} p-4 sm:p-6`}>
                    <div className="mb-3 flex items-center justify-between sm:mb-4">
                      <h2 className={`flex items-center gap-2 text-base font-semibold sm:text-lg ${theme.textHeading}`}>
                        <span className="text-xl">🎯</span> Recommended for You
                      </h2>
                      <Link href="/courses" className={`text-sm font-semibold ${theme.textAccent} hover:text-primary-700`}>
                        View all
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                      {recommendedCourses.map((course, index) => (
                        <AnimatedCard key={course.id} index={index} baseDelay={50} staggerDelay={50}>
                          <Link
                            href={`/courses/${course.id}`}
                            className={`group flex h-full flex-col overflow-hidden rounded-xl ${theme.bgSubtle} border border-slate-100 transition-all hover:shadow-lg dark:border-dark-700`}
                          >
                            <div className="relative h-24 flex-shrink-0 overflow-hidden sm:h-28">
                              <Image
                                src={courseImages[course.id] || images.hero.classroom}
                                alt={course.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div className="p-2 sm:p-3">
                              <h3 className={`text-xs font-semibold line-clamp-2 sm:text-sm ${theme.textHeading}`}>
                                {course.title}
                              </h3>
                              <p className={`text-[10px] sm:text-xs ${theme.textMuted}`}>{course.level}</p>
                            </div>
                          </Link>
                        </AnimatedCard>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Progress Overview */}
              <AnimatedSection animation="fade-left">
                <div className={`rounded-2xl ${theme.borderCard} ${theme.bgCard} p-4 sm:p-6`}>
                  <h2 className={`mb-3 flex items-center gap-2 text-base font-semibold sm:mb-4 sm:text-lg ${theme.textHeading}`}>
                    <span className="text-xl">📈</span> Progress
                  </h2>
                  {enrollments.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400">Enroll in a course to track your progress.</p>
                  ) : (
                    <div className="space-y-4">
                      {enrollments.map((e) => (
                        <div key={e._id}>
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="truncate text-slate-600 dark:text-slate-400">{e.courseCategory}</span>
                            <span className="ml-2 font-semibold text-slate-900 dark:text-white">{e.progress}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-dark-800">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-700 transition-all"
                              style={{ width: `${e.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* Payment Summary */}
              {enrollments.length > 0 && (
                <AnimatedSection animation="fade-left" delay={100}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-dark-800 dark:bg-dark-900 sm:p-6">
                    <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-white sm:mb-4 sm:text-lg">
                      Payment Status
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
                        <span className="text-sm text-emerald-700 dark:text-emerald-400">Paid</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">{paidCount}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
                        <span className="text-sm text-amber-700 dark:text-amber-400">Pending</span>
                        <span className="font-bold text-amber-700 dark:text-amber-400">{pendingCount}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Quick Links */}
              <AnimatedSection animation="fade-left" delay={200}>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-dark-800 dark:bg-dark-900 sm:p-6">
                  <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-white sm:mb-4 sm:text-lg">Quick Links</h2>
                  <div className="space-y-1">
                    <Link href="/courses" className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-dark-800">
                      <span className="text-lg">📚</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">Browse Courses</span>
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-dark-800">
                      <span className="text-lg">👤</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">My Profile</span>
                    </Link>
                    <Link href="/inquiry" className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-dark-800">
                      <span className="text-lg">❓</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">Ask a Question</span>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
