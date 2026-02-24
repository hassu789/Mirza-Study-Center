'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import { theme, typo } from '@/styles';
import { courses, instructors } from '@/data/courses';
import { images, courseImages, teacherImages, subjectImages } from '@/data/images';

export default function Home() {
  const featuredCourses = courses.slice(0, 6);
  
  const subjects = [
    { name: 'Physics', icon: '⚛️', gradient: 'from-primary-500 to-primary-600', students: '1200+', image: subjectImages.Physics },
    { name: 'Chemistry', icon: '🧪', gradient: 'from-emerald-500 to-teal-600', students: '980+', image: subjectImages.Chemistry },
    { name: 'Biology', icon: '🧬', gradient: 'from-pink-500 to-rose-600', students: '1450+', image: subjectImages.Biology },
    { name: 'Mathematics', icon: '📐', gradient: 'from-orange-500 to-amber-600', students: '1320+', image: subjectImages.Mathematics },
    { name: 'English', icon: '📚', gradient: 'from-blue-500 to-cyan-600', students: '890+', image: subjectImages.English },
    { name: 'Commerce', icon: '💼', gradient: 'from-green-500 to-emerald-600', students: '620+', image: subjectImages.Commerce },
  ];

  const features = [
    { icon: '📝', title: 'Regular Mock Tests', desc: 'Weekly tests, mock exams & detailed performance analysis to track progress', color: 'bg-primary-100 dark:bg-primary-900/30', image: images.features.exam },
    { icon: '🧠', title: 'Problem Solving Sessions', desc: 'Dedicated doubt-clearing and problem solving sessions for every subject', color: 'bg-emerald-100 dark:bg-emerald-900/30', image: images.features.studying },
    { icon: '✅', title: 'Timely Syllabus Completion', desc: 'Planned and timely completion of syllabus with thorough revision', color: 'bg-amber-100 dark:bg-amber-900/30', image: images.features.classroom },
    { icon: '🎯', title: '95% Results', desc: 'Proven track record of excellent results in board exams & competitive tests', color: 'bg-rose-100 dark:bg-rose-900/30', image: images.features.success },
  ];

  const facilities = [
    { icon: '📹', title: 'CCTV Surveillance', desc: 'Complete campus monitored by CCTV cameras for safety' },
    { icon: '🏫', title: 'Clean Classrooms', desc: 'Well-maintained, hygienic and spacious classrooms' },
    { icon: '👨‍🏫', title: 'Experienced Faculty', desc: 'Highly qualified teachers dedicated to student success' },
    { icon: '🤝', title: 'Individual Attention', desc: 'Small batch sizes ensuring personal attention for every student' },
  ];

  const classesData = [
    { level: 'Class 6-8', icon: '📖', desc: 'Foundation building', subjects: ['Mathematics', 'English', 'Science'], monthlyPrice: '₹1,000', duration: '6 months', bulkPrice: '₹5,000', bulkSave: '₹1,000', image: images.levels.foundation },
    { level: 'Class 9-10', icon: '📝', desc: 'Board preparation (CBSE/ICSE/U.P. Board)', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'], monthlyPrice: '₹1,000', duration: '6 months', bulkPrice: '₹5,000', bulkSave: '₹1,000', image: images.levels.secondary },
    { level: 'Class 11-12', icon: '🎯', desc: 'Board & Competitive Exams (CBSE/ICSE/U.P. Board)', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Commerce', 'English'], monthlyPrice: '₹1,000', duration: '12 months', bulkPrice: '₹10,000', bulkSave: '₹2,000', image: images.levels.senior },
    { level: 'BSc', icon: '🎓', desc: 'University level coaching', subjects: ['Physics', 'Chemistry', 'Biology'], monthlyPrice: '₹1,000', duration: '6 months', bulkPrice: '₹5,000', bulkSave: '₹1,000', image: images.levels.college },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans dark:bg-dark-950">
      <Header />
      
      {/* Hero Section */}
      <HeroSlider />

      {/* Subjects Section */}
      <section className="relative overflow-hidden bg-slate-50 px-4 py-12 dark:bg-dark-900 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up" className="mb-8 text-center sm:mb-12">
            <span className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 sm:mb-4">
              Our Expertise
            </span>
            <h2 className={`mb-3 ${typo.h1} ${theme.textHeading} sm:mb-4 sm:text-3xl lg:text-4xl`}>
              Subjects We Teach
            </h2>
            <p className={`mx-auto max-w-2xl text-sm ${theme.textBody} sm:text-lg`}>
              Comprehensive coaching across all major subjects with expert guidance
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {subjects.map((subject, index) => (
              <AnimatedCard key={subject.name} index={index} baseDelay={100}>
                <Link
                  href={`/courses?category=${subject.name}`}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 dark:bg-dark-800"
                >
                  <div className="relative h-24 overflow-hidden sm:h-32">
                    <Image
                      src={subject.image}
                      alt={subject.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${subject.gradient} opacity-60`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl drop-shadow-lg sm:text-4xl">{subject.icon}</span>
                    </div>
                  </div>
                  <div className="p-3 text-center sm:p-4">
                    <h3 className={`text-sm font-semibold ${theme.textHeading} sm:text-base`}>{subject.name}</h3>
                    <p className={`text-xs ${theme.textBody} sm:text-sm`}>{subject.students} students</p>
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up" className="mb-8 text-center sm:mb-12">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 sm:mb-4">
              Programs
            </span>
            <h2 className={`mb-3 ${typo.h1} ${theme.textHeading} sm:mb-4 sm:text-3xl lg:text-4xl`}>
              Classes We Offer
            </h2>
            <p className={`mx-auto max-w-2xl text-sm ${theme.textBody} sm:text-lg`}>
              From Class 6 to BSc — CBSE, ICSE & U.P. Board
            </p>
          </AnimatedSection>
          
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {classesData.map((item, index) => (
              <AnimatedCard key={item.level} index={index} baseDelay={100}>
                <div className={`group relative h-full overflow-hidden rounded-2xl ${theme.borderCard} ${theme.bgCard} transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col border`}>
                  <div className="relative h-36 flex-shrink-0 overflow-hidden sm:h-40">
                    <Image
                      src={item.image}
                      alt={item.level}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                      <span className="text-2xl sm:text-3xl">{item.icon}</span>
                      <h3 className="text-lg font-bold text-white sm:text-xl">{item.level}</h3>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className={`mb-3 text-sm ${theme.textBody}`}>{item.desc}</p>
                    <div className="mb-4 flex flex-wrap gap-1">
                      {item.subjects.map((sub) => (
                        <span key={sub} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-dark-800 dark:text-slate-400">
                          {sub}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto space-y-2 border-t border-slate-100 pt-3 dark:border-dark-800">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-xl font-bold ${theme.textAccent}`}>{item.monthlyPrice}</span>
                        <span className={`text-xs ${theme.textMuted}`}>/subject/month</span>
                      </div>
                      <div className="rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-900/20">
                        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          {item.duration} at once: <span className="text-sm">{item.bulkPrice}</span>
                        </p>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-500">Save {item.bulkSave}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-slate-50 px-4 py-12 dark:bg-dark-900 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up" className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-center">
            <div>
              <span className="mb-2 inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                Popular Choices
              </span>
              <h2 className={`${typo.h1} ${theme.textHeading} sm:text-3xl`}>
                Featured Courses
              </h2>
            </div>
            <Link
              href="/courses"
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 sm:px-6 sm:py-3"
            >
              View All
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
          
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {featuredCourses.map((course, index) => (
              <AnimatedCard key={course.id} index={index} baseDelay={100}>
                <Link
                  href={`/courses/${course.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-2xl hover:-translate-y-2 dark:border-dark-800 dark:bg-dark-950"
                >
                  <div className="relative h-40 flex-shrink-0 overflow-hidden sm:h-48">
                    <Image
                      src={courseImages[course.id] || images.hero.classroom}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        {course.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-1.5 text-center shadow-lg backdrop-blur">
                      <div className="text-sm font-bold text-slate-900">₹{course.price.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-slate-500">per subject/month</div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <span className={`mb-2 inline-block self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-medium ${theme.textBody} dark:bg-dark-800`}>
                      {course.level}
                    </span>
                    <h3 className={`mb-2 text-sm font-bold transition-colors group-hover:${theme.textAccent} sm:text-base ${theme.textHeading}`}>
                      {course.title}
                    </h3>
                    <div className={`mb-3 flex items-center gap-3 text-sm ${theme.textBody}`}>
                      <span className="flex items-center gap-1">
                        <span className="text-amber-500">★</span> {course.rating}
                      </span>
                      <span>•</span>
                      <span>{course.students} students</span>
                    </div>
                    <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-dark-800">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-600 text-xs font-bold text-white">
                        {course.instructorAvatar}
                      </div>
                      <span className={`text-sm ${theme.textBody} line-clamp-1`}>{course.instructor}</span>
                    </div>
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up" className="mb-8 text-center sm:mb-12">
            <span className="mb-3 inline-block rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 sm:mb-4">
              Our Faculty
            </span>
            <h2 className={`mb-3 ${typo.h1} ${theme.textHeading} sm:mb-4 sm:text-3xl lg:text-4xl`}>
              Meet Our Expert Teachers
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {instructors.map((teacher, index) => (
              <AnimatedCard key={teacher.id} index={index} baseDelay={100}>
                <div className={`group relative h-full flex flex-col overflow-hidden rounded-2xl border ${theme.borderCard} ${theme.bgCard} text-center transition-all hover:shadow-2xl hover:-translate-y-2`}>
                  <div className="flex flex-col items-center pt-5 sm:pt-8">
                    <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full border-4 border-primary-200 shadow-lg transition-transform duration-500 group-hover:scale-110 dark:border-primary-800 sm:mb-4 sm:h-32 sm:w-32">
                      <Image
                        src={teacherImages[teacher.id] || images.teachers.male1}
                        alt={teacher.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className={`text-sm font-bold ${theme.textHeading} sm:text-lg`}>{teacher.name}</h3>
                    <span className="mt-1 inline-block rounded-full bg-primary-100 px-3 py-0.5 text-[10px] font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 sm:px-4 sm:py-1 sm:text-xs">
                      {teacher.subject} Expert
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-5">
                    <p className={`mb-1 text-xs ${theme.textBody} sm:mb-2 sm:text-sm`}>
                      {teacher.qualification} • {teacher.experience}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 line-clamp-2 sm:text-sm">
                      {teacher.bio}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="bg-slate-50 px-4 py-12 dark:bg-dark-900 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up" className="mb-8 text-center sm:mb-12">
            <span className="mb-3 inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 sm:mb-4">
              Our Facilities
            </span>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white sm:mb-4 sm:text-3xl lg:text-4xl">
              What We Offer
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {facilities.map((facility, index) => (
              <AnimatedCard key={facility.title} index={index} baseDelay={100}>
                <div className={`group h-full rounded-2xl border ${theme.borderCard} bg-white p-4 text-center transition-all hover:shadow-2xl hover:-translate-y-2 dark:bg-dark-950 sm:p-6`}>
                  <div className="mb-3 text-3xl sm:mb-4 sm:text-4xl">{facility.icon}</div>
                  <h3 className="mb-1 text-sm font-bold text-slate-900 dark:text-white sm:mb-2 sm:text-base">{facility.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">{facility.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up" className="mb-8 text-center sm:mb-12">
            <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 sm:mb-4">
              Why Us
            </span>
            <h2 className={`mb-3 ${typo.h1} ${theme.textHeading} sm:mb-4 sm:text-3xl lg:text-4xl`}>
              Why Choose Mirza Study Centre?
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {features.map((feature, index) => (
              <AnimatedCard key={feature.title} index={index} baseDelay={100}>
                <div className={`group h-full flex flex-col overflow-hidden rounded-2xl border ${theme.borderCard} bg-white transition-all hover:shadow-2xl hover:-translate-y-2 dark:bg-dark-950`}>
                  <div className="relative h-24 flex-shrink-0 overflow-hidden sm:h-32">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-2xl sm:bottom-3 sm:left-3 sm:text-3xl">{feature.icon}</div>
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-5">
                    <h3 className={`mb-1 text-sm font-bold ${theme.textHeading} sm:mb-2 sm:text-base`}>{feature.title}</h3>
                    <p className={`text-xs ${theme.textBody} sm:text-sm`}>{feature.desc}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
            <Image
            src={images.students.group}
            alt="Students"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/90 to-primary-900/95"></div>
        </div>
        <div className="relative px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
          <AnimatedSection animation="zoom-in" className="mx-auto max-w-4xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-3xl lg:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mb-6 text-base text-white/80 sm:mb-8 sm:text-xl">
              Join thousands of successful students. Fill the inquiry form and our team will contact you within 24 hours.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href="/inquiry"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-primary-600 shadow-lg transition-all hover:shadow-2xl hover:scale-105 sm:px-8 sm:py-4 sm:text-lg"
              >
                Enquire Now
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:+919670212323"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 sm:px-8 sm:py-4 sm:text-lg"
              >
                📞 +91 96702 12323
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
