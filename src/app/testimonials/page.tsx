'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      course: 'Physics - Class 12',
      rating: 5,
      text: 'Mirza Study Centre helped me score 95% in Physics! Zeeshan Sir is amazing and the study materials are comprehensive. Highly recommended!',
      avatar: 'RS',
      result: '95% in Board Exams',
    },
    {
      name: 'Priya Patel',
      course: 'Chemistry - Class 11',
      rating: 5,
      text: 'The doubt clearing sessions are excellent. I was struggling with organic chemistry, but Ahmar Sir made it so easy to understand.',
      avatar: 'PP',
      result: 'Cleared JEE Mains',
    },
    {
      name: 'Amit Kumar',
      course: 'Mathematics - Class 10',
      rating: 5,
      text: 'Best coaching centre in Azamgarh! Shafee Sir makes math so simple. Small batch sizes mean individual attention. My confidence has increased tremendously.',
      avatar: 'AK',
      result: '98% in Board Exams',
    },
    {
      name: 'Sneha Reddy',
      course: 'Biology - Class 11',
      rating: 5,
      text: 'Asad Ayyub Sir and Zaid Sir both are outstanding! Their way of teaching Biology with diagrams and NCERT analysis is really helpful for NEET preparation.',
      avatar: 'SR',
      result: 'Topped in Biology',
    },
    {
      name: 'Vikram Singh',
      course: 'Physics - Class 9 (Parent)',
      rating: 5,
      text: 'My son improved from 60% to 90% in just one year at Mirza Study Centre. The regular mock tests and feedback helped him identify and work on weak areas.',
      avatar: 'VS',
      result: '90% Improvement',
    },
    {
      name: 'Anjali Mehta',
      course: 'English - Class 12',
      rating: 5,
      text: 'Saifee Sir\'s English Speaking Course is incredible! The classes are engaging and fun. I actually enjoy English now and scored 95% in my board exams!',
      avatar: 'AM',
      result: '95% in English',
    },
    {
      name: 'Mohit Gupta',
      course: 'Commerce - Class 12',
      rating: 5,
      text: 'Dr. Abul Vaish Sir is the best Commerce teacher. His way of teaching Accountancy with practical examples made it so easy. Cleared CA Foundation!',
      avatar: 'MG',
      result: 'Cleared CA Foundation',
    },
    {
      name: 'Farhan Khan',
      course: 'Chemistry - Class 10',
      rating: 5,
      text: 'Ahmar Sir\'s chemistry classes are amazing! The practicals and problem solving sessions are very helpful. Clean classrooms and CCTV surveillance gives parents peace of mind.',
      avatar: 'FK',
      result: '92% in Chemistry',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <AnimatedSection animation="fade-up">
            <h1 className="mb-3 text-center text-3xl font-bold text-white sm:mb-4 sm:text-4xl lg:text-5xl">
              What Our <span className="text-violet-400">Students Say</span>
            </h1>
            <p className="mx-auto max-w-3xl text-center text-sm text-slate-300 sm:text-lg">
              Don&apos;t just take our word for it. Hear from students who have achieved success with Mirza Study Centre.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard key={testimonial.name} index={index} baseDelay={50} staggerDelay={50}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                  {/* Rating */}
                  <div className="mb-3 flex items-center gap-1 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg sm:text-xl">★</span>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="mb-4 flex-1 text-sm text-slate-600 dark:text-slate-400 sm:mb-6 sm:text-base">
                    &quot;{testimonial.text}&quot;
                  </p>

                  {/* Student Info */}
                  <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-zinc-800 sm:gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-xs font-bold text-white sm:h-12 sm:w-12 sm:text-sm">
                      {testimonial.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{testimonial.name}</div>
                      <div className="truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">{testimonial.course}</div>
                      <div className="mt-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 sm:mt-1 sm:text-xs">
                        {testimonial.result}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 px-4 py-8 dark:bg-zinc-900 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up">
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 p-6 text-center text-white sm:p-12">
              <h2 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">Join Our Success Stories</h2>
              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <div>
                  <div className="mb-1 text-2xl font-bold sm:mb-2 sm:text-4xl">4.9/5</div>
                  <div className="text-xs text-violet-100 sm:text-base">Average Rating</div>
                </div>
                <div>
                  <div className="mb-1 text-2xl font-bold sm:mb-2 sm:text-4xl">95%</div>
                  <div className="text-xs text-violet-100 sm:text-base">Results</div>
                </div>
                <div>
                  <div className="mb-1 text-2xl font-bold sm:mb-2 sm:text-4xl">5000+</div>
                  <div className="text-xs text-violet-100 sm:text-base">Happy Students</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
