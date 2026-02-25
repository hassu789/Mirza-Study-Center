'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useToast } from '@/components/Toast';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { trackEvent } from '@/lib/gtag';
import { theme, typo } from '@/styles';
import { courses, instructors } from '@/data/courses';
import { courseImages, teacherImages, images } from '@/data/images';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { showToast } = useToast();
  const course = courses.find((c) => c.id === resolvedParams.id);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState('');

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) {
          setIsLoggedIn(true);
          // Check if already enrolled
          fetch('/api/enroll')
            .then((r) => r.json())
            .then((data) => {
              if (data.enrollments?.some((e: { courseId: string }) => e.courseId === resolvedParams.id)) {
                setIsEnrolled(true);
              }
            });
        }
      })
      .catch(() => {});
  }, [resolvedParams.id]);

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    setEnrolling(true);
    setEnrollMsg('');
    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: resolvedParams.id }),
      });
      const data = await res.json();
      if (data.success) {
        trackEvent('enrollment', { course_id: resolvedParams.id });
        setIsEnrolled(true);
        setEnrollMsg(data.message);
        showToast('Enrolled! Check your email for confirmation.', 'success');
      } else {
        setEnrollMsg(data.error || 'Failed to enroll');
      }
    } catch {
      setEnrollMsg('Something went wrong. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };
  const instructor = course ? instructors.find((i) => i.id === course.instructorId) : null;

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-dark-950">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-dark-800">
              <svg className="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className={`mb-2 ${typo.h1} ${theme.textHeading}`}>Course Not Found</h1>
            <p className={`mb-6 ${theme.textBody}`}>The course you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Browse Courses
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const curriculum = [
    { module: 'Module 1', title: 'Foundation & Basics', lessons: 8, duration: '3 weeks' },
    { module: 'Module 2', title: 'Core Concepts', lessons: 12, duration: '4 weeks' },
    { module: 'Module 3', title: 'Advanced Topics', lessons: 10, duration: '4 weeks' },
    { module: 'Module 4', title: 'Problem Solving & Practice', lessons: 15, duration: '3 weeks' },
    { module: 'Module 5', title: 'Exam Preparation', lessons: 8, duration: '2 weeks' },
  ];

  const whatYouWillLearn = [
    'Master fundamental concepts and principles',
    'Solve complex numerical problems efficiently',
    'Understand real-world applications',
    'Prepare for board exams and competitive tests',
    'Develop analytical and critical thinking skills',
    'Access comprehensive study materials',
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-dark-950">
      <Header />
      
      {/* Hero Section */}
      <section className={`relative overflow-hidden ${theme.gradientHero}`}>
        <div className="absolute inset-0">
          <Image
            src={courseImages[course.id] || images.hero.classroom}
            alt={course.title}
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="mb-3 sm:mb-4">
              <Link href="/courses" className="inline-flex items-center gap-2 text-xs text-white/80 transition-colors hover:text-white sm:text-sm">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Courses
              </Link>
            </div>
            <div className="mb-3 flex flex-wrap gap-2 sm:mb-4 sm:gap-3">
              <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white shadow-lg sm:px-4 sm:py-1.5 sm:text-sm">
                {course.category}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur sm:px-4 sm:py-1.5 sm:text-sm">
                {course.level}
              </span>
            </div>
            <h1 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-3xl lg:text-5xl">
              {course.title}
            </h1>
            <p className="mb-4 max-w-3xl text-sm text-slate-300 sm:mb-6 sm:text-lg">
              {course.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 sm:gap-6 sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-amber-400 text-base sm:text-lg">★</span>
                <span className="font-semibold text-white">{course.rating}</span>
                <span>rating</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <span className="font-semibold text-white">{course.students}</span>
                <span className="hidden sm:inline">students enrolled</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{course.duration}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* What You'll Learn */}
              <AnimatedSection animation="fade-up">
                <div className={`rounded-2xl border ${theme.borderCard} ${theme.bgCard} p-4 sm:p-6`}>
                  <h2 className={`mb-4 flex items-center gap-2 ${typo.h2} ${theme.textHeading} sm:mb-6 sm:gap-3 sm:text-xl`}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-100 text-sm text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 sm:h-10 sm:w-10 sm:text-base">
                      📚
                    </span>
                    What You&apos;ll Learn
                  </h2>
                  <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                    {whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3">
                        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-[10px] text-green-600 dark:bg-green-900/30 dark:text-green-400 sm:h-5 sm:w-5 sm:text-xs">
                          ✓
                        </span>
                        <span className={`text-xs ${theme.textBody} sm:text-sm`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Curriculum */}
              <AnimatedSection animation="fade-up" delay={100}>
                <div className={`rounded-2xl border ${theme.borderCard} ${theme.bgCard} p-4 sm:p-6`}>
                  <h2 className={`mb-4 flex items-center gap-2 ${typo.h2} ${theme.textHeading} sm:mb-6 sm:gap-3 sm:text-xl`}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-sm text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 sm:h-10 sm:w-10 sm:text-base">
                      📋
                    </span>
                    Course Curriculum
                  </h2>
                  <div className="space-y-2 sm:space-y-3">
                    {curriculum.map((item, index) => (
                      <div
                        key={index}
                        className="group rounded-xl border border-slate-100 bg-slate-50 p-3 transition-all hover:border-primary-200 hover:bg-primary-50/50 dark:border-dark-700 dark:bg-dark-800 dark:hover:border-primary-800 dark:hover:bg-primary-900/20 sm:p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 sm:gap-4">
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-primary-600 shadow-sm dark:bg-dark-700 dark:text-primary-400 sm:h-10 sm:w-10 sm:text-base">
                              {index + 1}
                            </span>
                            <div className="min-w-0">
                              <span className={`text-[10px] font-semibold uppercase ${theme.textAccent} sm:text-xs`}>{item.module}</span>
                              <h3 className={`truncate text-sm font-semibold ${theme.textHeading} sm:text-base`}>{item.title}</h3>
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-right text-[10px] text-slate-500 dark:text-slate-400 sm:text-sm">
                            <div>{item.lessons} lessons</div>
                            <div>{item.duration}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Instructor */}
              {instructor && (
                <AnimatedSection animation="fade-up" delay={200}>
                  <div className={`rounded-2xl border ${theme.borderCard} ${theme.bgCard} p-4 sm:p-6`}>
                    <h2 className={`mb-4 flex items-center gap-2 ${typo.h2} ${theme.textHeading} sm:mb-6 sm:gap-3 sm:text-xl`}>
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-sm text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 sm:h-10 sm:w-10 sm:text-base">
                        👨‍🏫
                      </span>
                      Your Instructor
                    </h2>
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                      <div className="relative mx-auto h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-4 border-primary-200 shadow-lg dark:border-primary-800 sm:mx-0 sm:h-32 sm:w-32">
                        <img
                          src={teacherImages[instructor.id] || images.teachers.male1}
                          alt={instructor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className={`text-base font-bold ${theme.textHeading} sm:text-lg`}>{instructor.name}</h3>
                        <p className={`mb-1 text-sm ${theme.textAccent} sm:mb-2`}>{instructor.subject} Expert</p>
                        <p className="mb-2 text-xs text-slate-500 dark:text-slate-500 sm:mb-3 sm:text-sm">
                          {instructor.qualification} • {instructor.experience}
                        </p>
                        <p className={`text-xs ${theme.textBody} sm:text-sm`}>{instructor.bio}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection animation="fade-left">
                <div className={`sticky top-24 overflow-hidden rounded-2xl border ${theme.borderCard} ${theme.bgCard} shadow-xl`}>
                  {/* Course Image */}
                  <div className="relative h-40 overflow-hidden sm:h-48">
                    <Image
                      src={courseImages[course.id] || images.hero.classroom}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="mb-4 space-y-3 sm:mb-6">
                      <div>
                        <span className={`text-3xl font-bold ${theme.textHeading} sm:text-4xl`}>₹{course.price.toLocaleString('en-IN')}</span>
                        <span className={`text-sm ${theme.textMuted}`}>/month per subject</span>
                      </div>
                      {course.price6Months && (
                        <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-900/20">
                          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Pay 6 months at once</p>
                          <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">₹{course.price6Months.toLocaleString('en-IN')}</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-500">Save ₹1,000 (was ₹6,000)</p>
                        </div>
                      )}
                      {course.price12Months && (
                        <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-900/20">
                          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Pay 12 months at once</p>
                          <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">₹{course.price12Months.toLocaleString('en-IN')}</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-500">Save ₹2,000 (was ₹12,000)</p>
                        </div>
                      )}
                    </div>

                    {isEnrolled ? (
                      <Link
                        href="/feed"
                        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 sm:mb-4 sm:py-4 sm:text-base"
                      >
                        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Enrolled — Go to Dashboard
                      </Link>
                    ) : (
                      <button
                        onClick={handleEnroll}
                        disabled={enrolling}
                        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl hover:shadow-primary-500/40 disabled:opacity-50 sm:mb-4 sm:py-4 sm:text-base"
                      >
                        {enrolling ? 'Enrolling...' : (isLoggedIn ? 'Enroll Now' : 'Login to Enroll')}
                        {!enrolling && (
                          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        )}
                      </button>
                    )}

                    {enrollMsg && (
                      <p className={`mb-3 text-center text-sm ${isEnrolled ? 'text-emerald-600' : 'text-red-600'}`}>
                        {enrollMsg}
                      </p>
                    )}

                    <Link
                      href="/inquiry"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-primary-200 hover:bg-primary-50 dark:border-dark-700 dark:text-slate-300 dark:hover:border-primary-800 dark:hover:bg-primary-900/20 sm:py-4 sm:text-base"
                    >
                      Request Demo Class
                    </Link>

                    <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 dark:border-dark-800 sm:mt-6 sm:space-y-4 sm:pt-6">
                      <div className={`flex items-center gap-2 text-xs ${theme.textBody} sm:gap-3 sm:text-sm`}>
                        <svg className="h-4 w-4 flex-shrink-0 text-slate-400 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Duration: {course.duration}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${theme.textBody} sm:gap-3 sm:text-sm`}>
                        <svg className="h-4 w-4 flex-shrink-0 text-slate-400 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Comprehensive notes included</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${theme.textBody} sm:gap-3 sm:text-sm`}>
                        <svg className="h-4 w-4 flex-shrink-0 text-slate-400 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <span>Weekly tests & assignments</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${theme.textBody} sm:gap-3 sm:text-sm`}>
                        <svg className="h-4 w-4 flex-shrink-0 text-slate-400 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>Doubt clearing sessions</span>
                      </div>
                    </div>
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
