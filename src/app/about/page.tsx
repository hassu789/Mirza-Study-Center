'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import { images, teacherImages } from '@/data/images';
import { instructors } from '@/data/courses';

export default function AboutPage() {
  const stats = [
    { value: '10+', label: 'Years of Excellence', icon: '🏆' },
    { value: '5000+', label: 'Students Taught', icon: '👨‍🎓' },
    { value: '95%', label: 'Results', icon: '📈' },
    { value: '8+', label: 'Expert Teachers', icon: '👨‍🏫' },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      desc: 'We strive for excellence in every aspect of teaching and learning.',
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: '💡',
      title: 'Innovation',
      desc: 'Using modern teaching methods and technology to enhance learning.',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: '🤝',
      title: 'Individual Attention',
      desc: 'Dedicated support with small batch sizes for every student.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: '🌟',
      title: '95% Results',
      desc: 'Committed to delivering excellent results in board exams & competitive tests.',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  const facilities = [
    { icon: '📹', title: 'CCTV Camera Surveillance' },
    { icon: '🏫', title: 'Clean Classrooms' },
    { icon: '👨‍🏫', title: 'Experienced Faculties' },
    { icon: '🤝', title: 'Individual Attention' },
    { icon: '📝', title: 'Regular Mock Tests' },
    { icon: '🧠', title: 'Problem Solving Sessions' },
    { icon: '✅', title: 'Timely Syllabus Completion' },
    { icon: '📈', title: '95% Results' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900">
        <div className="absolute inset-0">
          <Image
            src={images.hero.classroom}
            alt="About Us"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <AnimatedSection animation="fade-up">
            <h1 className="mb-3 text-center text-3xl font-bold text-white sm:mb-4 sm:text-4xl lg:text-5xl">
              About <span className="text-violet-400">Mirza Study Centre</span>
            </h1>
            <p className="mx-auto max-w-3xl text-center text-sm text-slate-300 sm:text-lg">
              Empowering students with quality education and expert guidance for over 10 years.
              Building futures, one student at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <AnimatedCard key={stat.label} index={index} baseDelay={50} staggerDelay={50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                  <div className="mb-2 text-3xl sm:mb-3 sm:text-4xl">{stat.icon}</div>
                  <div className="mb-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{stat.value}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">{stat.label}</div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-slate-50 px-4 py-12 dark:bg-zinc-900 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <AnimatedSection animation="fade-right">
              <div className="relative h-64 overflow-hidden rounded-2xl sm:h-96">
                <Image
                  src={images.about}
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Our Story</h2>
              <p className="mb-4 text-slate-600 dark:text-slate-400">
                Mirza Study Centre was founded with a simple mission: to provide quality education
                that empowers students to achieve their academic goals. Located beside Shibli Inter College
                in Pandey Bazar, Azamgarh, what started as a small coaching centre has grown into a
                trusted institution serving thousands of students.
              </p>
              <p className="mb-4 text-slate-600 dark:text-slate-400">
                Our team of 8+ experienced educators are passionate about helping students succeed.
                We believe in individual attention, comprehensive study materials, and a supportive
                learning environment. We prepare students for CBSE, ICSE & U.P. Board examinations.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Today, we offer courses for Class 9-12 and BSc students in Physics, Chemistry,
                Biology, Mathematics, English, and Commerce. Our 95% results track record and
                thousands of satisfied students speak for themselves.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Facilities & Why Choose Us */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up" className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white sm:mb-4 sm:text-3xl">Our Facilities & Why Choose Us</h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Everything you need for a successful academic journey
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {facilities.map((facility, index) => (
              <AnimatedCard key={facility.title} index={index} baseDelay={50} staggerDelay={50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                  <div className="mb-2 text-3xl sm:mb-3 sm:text-4xl">{facility.icon}</div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{facility.title}</h3>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-slate-50 px-4 py-12 dark:bg-zinc-900 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up" className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white sm:mb-4 sm:text-3xl">Our Values</h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              The principles that guide everything we do at Mirza Study Centre
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {values.map((value, index) => (
              <AnimatedCard key={value.title} index={index} baseDelay={50} staggerDelay={50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                  <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${value.color} text-2xl shadow-lg sm:mb-4 sm:h-16 sm:w-16 sm:text-3xl`}>
                    {value.icon}
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-slate-900 dark:text-white sm:mb-2 sm:text-lg">{value.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">{value.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up" className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white sm:mb-4 sm:text-3xl">Meet Our Faculty</h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Experienced educators dedicated to your success
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {instructors.map((member, index) => (
              <AnimatedCard key={member.name} index={index} baseDelay={50} staggerDelay={50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                  <div className="relative mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-violet-200 shadow-lg dark:border-violet-800 sm:mb-4 sm:h-28 sm:w-28">
                    <Image
                      src={teacherImages[member.id] || images.teachers.male1}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-slate-900 dark:text-white sm:text-lg">{member.name}</h3>
                  <p className="mb-1 text-xs font-semibold text-violet-600 dark:text-violet-400 sm:mb-2 sm:text-sm">{member.subject} Expert</p>
                  <p className="mb-0.5 text-[10px] text-slate-500 dark:text-slate-400 sm:mb-1 sm:text-xs">{member.qualification}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">{member.experience} experience</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection animation="fade-up">
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 p-6 text-center text-white sm:p-12">
              <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">Ready to Start Your Journey?</h2>
              <p className="mb-3 text-sm text-violet-100 sm:mb-4 sm:text-lg">
                Join thousands of successful students and achieve your academic goals
              </p>
              <p className="mb-6 text-xs text-violet-200 sm:mb-8 sm:text-base">
                📍 Beside Shibli Inter College, Pandey Bazar, Azamgarh | 📞 +91 96702 12323
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link
                  href="/inquiry"
                  className="rounded-xl bg-white px-6 py-3 font-semibold text-violet-600 transition-all hover:bg-violet-50 sm:px-8 sm:py-4"
                >
                  Enquire Now
                </Link>
                <Link
                  href="/courses"
                  className="rounded-xl border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 sm:px-8 sm:py-4"
                >
                  View Courses
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
