'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { images } from '@/data/images';
import { validateName, validateEmail, validatePhone } from '@/utils/validation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  studentClass: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  studentClass?: string;
  subject?: string;
}

export default function InquiryPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    studentClass: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'BSc 1st Year', 'BSc 2nd Year', 'BSc 3rd Year'];
  const subjects = ['Physics', 'Chemistry', 'Biology', 'Commerce', 'Mathematics', 'English', 'All Subjects'];

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

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
    const validation = validatePhone(value);
    setErrors({ ...errors, phone: validation.isValid ? undefined : validation.error });
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
      case 'phone':
        const phoneValidation = validatePhone(formData.phone);
        setErrors({ ...errors, phone: phoneValidation.isValid ? undefined : phoneValidation.error });
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    // Validate all required fields
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const phoneValidation = validatePhone(formData.phone);

    const newErrors: FieldErrors = {};
    if (!nameValidation.isValid) newErrors.name = nameValidation.error;
    if (!emailValidation.isValid) newErrors.email = emailValidation.error;
    if (!phoneValidation.isValid) newErrors.phone = phoneValidation.error;
    if (!formData.studentClass) newErrors.studentClass = 'Please select a class';
    if (!formData.subject) newErrors.subject = 'Please select a subject';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, phone: true, studentClass: true, subject: true });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', studentClass: '', subject: '', message: '' });
        setErrors({});
        setTouched({});
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: '📍', title: 'Address', value: 'Beside Shibli Inter College, Pandey Bazar, Azamgarh' },
    { icon: '📞', title: 'Phone', value: '+91 96702 12323 / +91 89572 05460' },
    { icon: '📞', title: 'Phone', value: '+91 93358 69519' },
    { icon: '✉️', title: 'Email', value: 'info@mirzastudycentre.com' },
    { icon: '⏰', title: 'Hours', value: 'Mon-Sat: 9AM - 8PM' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900">
        <div className="absolute inset-0">
          <Image
            src={images.features.classroom}
            alt="Classroom"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <AnimatedSection animation="fade-up">
            <h1 className="mb-3 text-center text-3xl font-bold text-white sm:mb-4 sm:text-4xl lg:text-5xl">
              Get in <span className="text-violet-400">Touch</span>
            </h1>
            <p className="mx-auto max-w-2xl text-center text-sm text-slate-300 sm:text-lg">
              Have questions? Fill out the form below and our team will contact you within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Contact Info */}
            <AnimatedSection animation="fade-right" className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white sm:mb-4 sm:text-2xl">
                  Contact Information
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                  Reach out to us through any of these channels. We&apos;re here to help you on your educational journey.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 sm:gap-4 sm:p-4"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg dark:bg-violet-900/30 sm:h-12 sm:w-12 sm:text-xl">
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{item.title}</h3>
                      <p className="break-words text-xs text-slate-600 dark:text-slate-400 sm:text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps Embed */}
              <div className="overflow-hidden rounded-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.5!2d83.185!3d26.0685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShibli+Inter+College+Pandey+Bazar+Azamgarh!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="256"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mirza Study Centre Location"
                  className="h-48 w-full sm:h-64"
                />
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection animation="fade-left">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
                <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:mb-6 sm:text-2xl">
                  Send us a Message
                </h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4 dark:bg-green-900/20 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        ✓
                      </span>
                      <div>
                        <h3 className="font-semibold text-green-800 dark:text-green-400">Thank you!</h3>
                        <p className="text-sm text-green-600 dark:text-green-500">We&apos;ll contact you soon.</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 dark:bg-red-900/20 dark:border-red-800">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        ✕
                      </span>
                      <div>
                        <h3 className="font-semibold text-red-800 dark:text-red-400">Error</h3>
                        <p className="text-sm text-red-600 dark:text-red-500">Please try again later.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        onBlur={() => handleBlur('name')}
                        className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 ${
                          errors.name && touched.name
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-300 focus:border-violet-500 focus:ring-violet-500/20 dark:border-zinc-700'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && touched.name && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 ${
                          errors.email && touched.email
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-300 focus:border-violet-500 focus:ring-violet-500/20 dark:border-zinc-700'
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.email && touched.email && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 ${
                          errors.phone && touched.phone
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-300 focus:border-violet-500 focus:ring-violet-500/20 dark:border-zinc-700'
                        }`}
                        placeholder="98765 43210"
                        maxLength={10}
                      />
                      {errors.phone && touched.phone && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Class/Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.studentClass}
                        onChange={(e) => {
                          setFormData({ ...formData, studentClass: e.target.value });
                          setErrors({ ...errors, studentClass: undefined });
                        }}
                        onBlur={() => {
                          setTouched({ ...touched, studentClass: true });
                          if (!formData.studentClass) {
                            setErrors({ ...errors, studentClass: 'Please select a class' });
                          }
                        }}
                        className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 transition-all focus:outline-none focus:ring-2 dark:bg-zinc-800 dark:text-white ${
                          errors.studentClass && touched.studentClass
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-300 focus:border-violet-500 focus:ring-violet-500/20 dark:border-zinc-700'
                        }`}
                      >
                        <option value="">Select class</option>
                        {classes.map((cls) => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                      </select>
                      {errors.studentClass && touched.studentClass && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.studentClass}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Subject Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        setErrors({ ...errors, subject: undefined });
                      }}
                      onBlur={() => {
                        setTouched({ ...touched, subject: true });
                        if (!formData.subject) {
                          setErrors({ ...errors, subject: 'Please select a subject' });
                        }
                      }}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 transition-all focus:outline-none focus:ring-2 dark:bg-zinc-800 dark:text-white ${
                        errors.subject && touched.subject
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-300 focus:border-violet-500 focus:ring-violet-500/20 dark:border-zinc-700'
                      }`}
                    >
                      <option value="">Select subject</option>
                      {subjects.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                    {errors.subject && touched.subject && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
