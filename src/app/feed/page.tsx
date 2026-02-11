'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import { courses } from '@/data/courses';
import { courseImages, images } from '@/data/images';

interface User {
  id: string;
  username?: string;
  name: string;
  email?: string;
}

export default function FeedPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    
    if (isAuthenticated === 'true' && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const recommendedCourses = courses.slice(0, 3);
  
  const quickActions = [
    { icon: '📚', title: 'My Courses', desc: 'View enrolled courses', href: '/courses', color: 'from-violet-500 to-purple-600' },
    { icon: '📝', title: 'Assignments', desc: '3 pending', href: '#', color: 'from-amber-500 to-orange-600' },
    { icon: '📊', title: 'Progress', desc: '72% complete', href: '#', color: 'from-emerald-500 to-teal-600' },
    { icon: '💬', title: 'Messages', desc: '2 unread', href: '#', color: 'from-blue-500 to-cyan-600' },
  ];

  const upcomingClasses = [
    { subject: 'Physics', topic: 'Electromagnetic Waves', time: 'Today, 4:00 PM', teacher: 'Zeeshan Sir' },
    { subject: 'Chemistry', topic: 'Organic Reactions', time: 'Tomorrow, 10:00 AM', teacher: 'Ahmar Sir' },
    { subject: 'Mathematics', topic: 'Integration', time: 'Tomorrow, 2:00 PM', teacher: 'Shafee Sir' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900">
        <div className="absolute inset-0">
          <Image
            src={images.features.studying}
            alt="Studying"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 text-xs text-violet-300 sm:text-sm">Welcome back,</p>
                <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {user.name || user.username} 👋
                </h1>
                <p className="mt-1 text-sm text-slate-300 sm:mt-2 sm:text-base">
                  Ready to continue your learning journey?
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/30"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Quick Actions */}
          <AnimatedSection animation="fade-up" className="mb-6 sm:mb-8">
            <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-white sm:mb-4 sm:text-lg">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <AnimatedCard key={action.title} index={index} baseDelay={50} staggerDelay={50}>
                  <Link
                    href={action.href}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition-all hover:shadow-xl hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900 sm:gap-4 sm:p-4"
                  >
                    <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} text-lg shadow-lg sm:h-12 sm:w-12 sm:text-xl`}>
                      {action.icon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{action.title}</h3>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">{action.desc}</p>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Upcoming Classes */}
              <AnimatedSection animation="fade-up">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                  <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white sm:mb-4 sm:text-lg">
                    <span className="text-xl sm:text-2xl">📅</span>
                    Upcoming Classes
                  </h2>
                  <div className="space-y-3">
                    {upcomingClasses.map((cls, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 rounded-xl bg-slate-50 p-3 transition-all hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 sm:flex-row sm:items-center sm:justify-between sm:p-4"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400 sm:h-10 sm:w-10">
                            {cls.subject.charAt(0)}
                          </span>
                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{cls.topic}</h3>
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                              {cls.subject} • {cls.teacher}
                            </p>
                          </div>
                        </div>
                        <div className="ml-12 sm:ml-0 sm:text-right">
                          <span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-semibold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400 sm:text-xs">
                            {cls.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Recommended Courses */}
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                  <div className="mb-3 flex items-center justify-between sm:mb-4">
                    <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
                      <span className="text-xl sm:text-2xl">🎯</span>
                      Recommended for You
                    </h2>
                    <Link href="/courses" className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
                      View all →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                    {recommendedCourses.map((course, index) => (
                      <AnimatedCard key={course.id} index={index} baseDelay={50} staggerDelay={50}>
                        <Link
                          href={`/courses/${course.id}`}
                          className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-slate-50 transition-all hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
                        >
                          <div className="relative h-24 flex-shrink-0 overflow-hidden sm:h-28">
                            <Image
                              src={courseImages[course.id] || images.hero.classroom}
                              alt={course.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          </div>
                          <div className="p-2 sm:p-3">
                            <h3 className="text-xs font-semibold text-slate-900 line-clamp-2 dark:text-white sm:text-sm sm:line-clamp-1">
                              {course.title}
                            </h3>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">{course.level}</p>
                          </div>
                        </Link>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Progress Card */}
              <AnimatedSection animation="fade-left">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                  <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white sm:mb-4 sm:text-lg">
                    <span className="text-xl sm:text-2xl">📈</span>
                    Your Progress
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Overall Progress</span>
                        <span className="font-semibold text-slate-900 dark:text-white">72%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet-600 to-purple-600"></div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Physics</span>
                        <span className="font-semibold text-slate-900 dark:text-white">85%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                        <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Chemistry</span>
                        <span className="font-semibold text-slate-900 dark:text-white">68%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Study Streak */}
              <AnimatedSection animation="fade-left" delay={100}>
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-violet-600 to-purple-600 p-4 text-white sm:p-6">
                  <div className="mb-1 text-4xl sm:mb-2 sm:text-5xl">🔥</div>
                  <h3 className="text-xl font-bold sm:text-2xl">7 Day Streak!</h3>
                  <p className="text-violet-200">Keep it up! You&apos;re on fire.</p>
                </div>
              </AnimatedSection>

              {/* Quick Links */}
              <AnimatedSection animation="fade-left" delay={200}>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                  <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-white sm:mb-4 sm:text-lg">Resources</h2>
                  <div className="space-y-2">
                    <Link href="#" className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-zinc-800">
                      <span className="text-xl">📄</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">Study Notes</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-zinc-800">
                      <span className="text-xl">📋</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">Previous Papers</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-zinc-800">
                      <span className="text-xl">🎥</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">Video Lectures</span>
                    </Link>
                    <Link href="/inquiry" className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-zinc-800">
                      <span className="text-xl">❓</span>
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
