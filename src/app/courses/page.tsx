'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import { courses } from '@/data/courses';
import { courseImages, images } from '@/data/images';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = ['All', 'Physics', 'Chemistry', 'Biology', 'Commerce', 'Mathematics', 'English'];
  const levels = ['All', 'Class 6-8', 'Class 9-10', 'Class 11-12', 'BSc'];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900">
        <div className="absolute inset-0">
          <Image
            src={images.hero.library}
            alt="Library"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <h1 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Explore Our <span className="text-violet-400">Courses</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-slate-300">
              Find the perfect course for your academic journey. Expert teachers, comprehensive curriculum, proven results.
            </p>
          </AnimatedSection>
          
          {/* Search Bar */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  aria-label="Search courses"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border-0 bg-white/10 px-6 py-4 pl-14 text-white placeholder-slate-400 backdrop-blur-sm ring-1 ring-white/20 transition-all focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <svg className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Filters */}
          <AnimatedSection animation="fade-up" className="mb-8 rounded-2xl bg-slate-50 p-6 dark:bg-zinc-900">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                          : 'bg-white text-slate-600 hover:bg-violet-50 dark:bg-zinc-800 dark:text-slate-400 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Level</label>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        selectedLevel === level
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-white text-slate-600 hover:bg-emerald-50 dark:bg-zinc-800 dark:text-slate-400 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Results Count */}
          <AnimatedSection animation="fade-up" className="mb-6 flex items-center justify-between">
            <p className="text-slate-600 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredCourses.length}</span> courses
            </p>
          </AnimatedSection>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course, index) => (
                <AnimatedCard key={course.id} index={index} baseDelay={50} staggerDelay={50}>
                  <Link
                    href={`/courses/${course.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-2xl hover:-translate-y-2 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="relative h-48 flex-shrink-0 overflow-hidden sm:h-52">
                      <Image
                        src={courseImages[course.id] || images.hero.classroom}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2 sm:top-4 sm:left-4">
                        <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                          {course.category}
                        </span>
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur">
                          {course.level}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 rounded-xl bg-white px-3 py-1.5 text-center shadow-lg sm:bottom-4 sm:right-4 sm:px-4 sm:py-2">
                        <div className="text-base font-bold text-slate-900 sm:text-lg">₹{course.price.toLocaleString('en-IN')}</div>
                        <div className="text-[10px] text-slate-500 sm:text-xs">per subject/month</div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <h3 className="mb-2 text-base font-bold text-slate-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400 sm:text-lg">
                        {course.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                        {course.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-xs font-bold text-white shadow-md">
                            {course.instructorAvatar}
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-1">{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <span className="text-amber-500">★</span>
                            {course.rating}
                          </span>
                          <span className="hidden items-center gap-1 sm:flex">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            {course.students}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <AnimatedSection animation="fade-up">
              <div className="rounded-2xl bg-slate-50 p-12 text-center dark:bg-zinc-900">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 dark:bg-zinc-800">
                  <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">No courses found</h3>
                <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters or search term</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
