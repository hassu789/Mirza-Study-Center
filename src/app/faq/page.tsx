'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What classes do you offer?',
      answer: 'We offer coaching for Class 6-8, Class 9-10, Class 11-12, and BSc levels. Subjects include Physics, Chemistry, Biology, Mathematics, English, and Commerce.',
    },
    {
      question: 'Which boards do you prepare for?',
      answer: 'We prepare students for CBSE, ICSE, and U.P. Board examinations. Our curriculum is designed to cover all three boards comprehensively.',
    },
    {
      question: 'What are the batch sizes?',
      answer: 'We maintain small batch sizes (15-25 students) to ensure personalized attention and individual focus on every student.',
    },
    {
      question: 'What are the fees?',
      answer: 'We charge ₹1,000 per subject per month. Pay 6 months at once for ₹5,000 (save ₹1,000). Pay 12 months at once for ₹10,000 (save ₹2,000). Contact us for detailed fee structure.',
    },
    {
      question: 'Who are the teachers?',
      answer: 'Our faculty includes: Zeeshan Sir (Physics), Shafee Sir (Mathematics), Ahmar Sir & Shahbaz Sir (Chemistry), Asad Ayyub Sir & Zaid Sir (Biology), Dr. Abul Vaish Sir (Commerce), and Saifee Sir (English).',
    },
    {
      question: 'Do you provide study materials?',
      answer: 'Yes! We provide comprehensive study materials including notes, worksheets, previous year papers, and practice tests. All materials are included in the course fee.',
    },
    {
      question: 'Are there regular tests?',
      answer: 'Yes, we conduct regular mock tests, weekly tests, and provide detailed performance analysis to help students track their progress and identify areas for improvement.',
    },
    {
      question: 'Can I attend a demo class?',
      answer: 'Absolutely! We offer free demo classes so you can experience our teaching methodology before enrolling. Contact us to schedule a demo.',
    },
    {
      question: 'What are the class timings?',
      answer: 'We offer flexible batch timings including afternoon and evening batches. Specific timings depend on the course and level. Contact us for details.',
    },
    {
      question: 'What facilities do you provide?',
      answer: 'Our centre has CCTV camera surveillance, clean classrooms, experienced faculties, and ensures individual attention for every student. We also provide regular mock tests, problem solving sessions, and timely completion of syllabus.',
    },
    {
      question: 'Where is the centre located?',
      answer: 'Mirza Study Centre is located beside Shibli Inter College, Pandey Bazar, Azamgarh. You can reach us at +91 9670212323, +91 8957205460, or +91 9335869519.',
    },
    {
      question: 'How do I enroll?',
      answer: 'You can enroll by filling out our inquiry form on the website, calling us, or visiting our centre at Pandey Bazar, Azamgarh. Our team will guide you through the enrollment process.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900">
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <AnimatedSection animation="fade-up">
            <h1 className="mb-3 text-center text-3xl font-bold text-white sm:mb-4 sm:text-4xl lg:text-5xl">
              Frequently Asked <span className="text-violet-400">Questions</span>
            </h1>
            <p className="mx-auto max-w-3xl text-center text-sm text-slate-300 sm:text-lg">
              Find answers to common questions about Mirza Study Centre, our courses, enrollment, and more.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 50}>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-2xl">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800 sm:p-6"
                  >
                    <span className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{faq.question}</span>
                    <svg
                      className={`h-4 w-4 flex-shrink-0 text-slate-500 transition-transform sm:h-5 sm:w-5 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div id={`faq-answer-${index}`} role="region" className="border-t border-slate-100 px-4 py-3 dark:border-zinc-800 sm:px-6 sm:py-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Contact CTA */}
          <AnimatedSection animation="fade-up" delay={600} className="mt-8 sm:mt-12">
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 p-6 text-center text-white sm:p-8">
              <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">Still have questions?</h2>
              <p className="mb-2 text-sm text-violet-100 sm:text-base">
                Our team is here to help! Get in touch with us and we&apos;ll answer any questions you have.
              </p>
              <p className="mb-4 text-xs text-violet-200 sm:mb-6 sm:text-sm">
                📞 +91 96702 12323 | 📍 Beside Shibli Inter College, Pandey Bazar, Azamgarh
              </p>
              <Link
                href="/inquiry"
                className="inline-block rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-violet-600 transition-all hover:bg-violet-50 sm:px-8 sm:py-3 sm:text-base"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
