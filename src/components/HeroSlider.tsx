'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { images } from '@/data/images';
import { theme } from '@/styles';

const slides = [
  {
    image: images.hero.main,
    badge: 'New Batch Started — Admission Open!',
    heading: 'Mirza Study Centre',
    sub: 'Your Success is Our Mission',
    body: 'Expert coaching for Class 6–12 & BSc in Physics, Chemistry, Biology, Mathematics, Commerce & English.',
  },
  {
    image: images.hero.classroom,
    badge: '8+ Expert Teachers on Campus',
    heading: 'Learn from the Best',
    sub: 'Expert Faculty for Every Subject',
    body: 'Experienced and dedicated teachers who go the extra mile — doubt-clearing sessions, personal attention, and more.',
  },
  {
    image: images.hero.students,
    badge: '95% Board Exam Results',
    heading: '5 000+ Successful Students',
    sub: 'A Decade of Proven Results',
    body: 'Join a growing community of toppers. Our students consistently excel in CBSE, ICSE & U.P. Board examinations.',
  },
  {
    image: images.hero.library,
    badge: 'CBSE · ICSE · U.P. Board',
    heading: 'Class 6–12 & BSc',
    sub: 'Comprehensive Course Coverage',
    body: 'Foundation to university level — timely syllabus completion, regular mock tests & thorough revision.',
  },
];

const INTERVAL = 6000;

const imgVariants: Variants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0, 0, 0.2, 1] } },
  exit: { opacity: 0, scale: 1.04, transition: { duration: 0.8, ease: [0.4, 0, 1, 1] } },
};

const textContainer: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const textChild: Variants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = slides[index];

  return (
    <section
      className="relative flex min-h-[70vh] items-center overflow-hidden sm:min-h-[80vh] lg:min-h-[90vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          variants={imgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.heading}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/50" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 h-80 w-80 rounded-full ${theme.blurViolet}`} />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={textContainer}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Badge */}
              <motion.div variants={textChild}>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                  <span className="flex h-2 w-2 animate-pulse rounded-full bg-green-400" />
                  {slide.badge}
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={textChild}
                className="mb-4 text-3xl font-bold tracking-tight text-white sm:mb-6 sm:text-5xl lg:text-6xl"
              >
                <span className="block bg-gradient-to-r from-primary-300 via-primary-400 to-sky-400 bg-clip-text text-transparent">
                  {slide.heading}
                </span>
                <span className="block text-2xl sm:text-4xl lg:text-5xl">{slide.sub}</span>
              </motion.h1>

              {/* Body */}
              <motion.p
                variants={textChild}
                className="mb-6 max-w-xl text-sm text-slate-300 sm:mb-8 sm:text-lg"
              >
                {slide.body}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={textChild} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/inquiry"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-700 hover:shadow-xl sm:px-8 sm:py-4 sm:text-lg"
                >
                  Enquire Now
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 sm:px-8 sm:py-4 sm:text-lg"
                >
                  View Courses
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Stats grid (right side) */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-0">
            {[
              { value: '10+', label: 'Years Experience', icon: '🏆' },
              { value: '5000+', label: 'Students Taught', icon: '👨‍🎓' },
              { value: '95%', label: 'Results', icon: '📈' },
              { value: '8+', label: 'Expert Teachers', icon: '👨‍🏫' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/15 sm:p-6"
              >
                <div className="mb-1 text-2xl transition-transform group-hover:scale-110 sm:mb-2 sm:text-3xl">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
                <div className="text-xs text-slate-400 sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="mt-8 flex items-center justify-center gap-2 sm:mt-12 lg:justify-start">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative h-2 overflow-hidden rounded-full transition-all"
              style={{ width: i === index ? 40 : 12 }}
            >
              <span className="absolute inset-0 rounded-full bg-white/30" />
              {i === index && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-primary-400"
                  layoutId="heroIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
