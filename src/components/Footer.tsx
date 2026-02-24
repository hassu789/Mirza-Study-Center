'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contact } from '@/data/contact';
import { useToast } from '@/components/Toast';
import { theme, typo } from '@/styles';

export default function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubscribed(true);
        setEmail('');
        showToast(data.message || 'Thank you for subscribing!', 'success');
        setTimeout(() => setIsSubscribed(false), 3000);
      } else {
        showToast(data.error || 'Something went wrong.', 'error');
      }
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className={`relative overflow-hidden border-t ${theme.borderCard} ${theme.bgFooter} text-white`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 h-80 w-80 rounded-full ${theme.blurViolet}`}></div>
        <div className={`absolute -bottom-40 -left-40 h-80 w-80 rounded-full ${theme.blurPurple}`}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="group mb-4 inline-flex items-center gap-2 sm:mb-6 sm:gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.gradientBrand} text-sm font-bold shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-105 sm:h-12 sm:w-12 sm:text-lg`}>
                MSC
              </div>
              <span className={typo.brandName}>Mirza Study Centre</span>
            </Link>
            <p className="mb-4 max-w-sm text-sm text-slate-400 sm:mb-6">
              Empowering students with quality education. Your trusted partner for academic excellence in Azamgarh.
            </p>
            
            {/* Social Links - use official logos from public/images/social/ */}
            <div className="flex items-center gap-2 sm:gap-3">
              {contact.social.facebook && (
                <a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white transition-all hover:bg-white/10 hover:scale-110 sm:h-10 sm:w-10">
                  <Image src={contact.socialLogos.facebook} alt="" width={24} height={24} className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              )}
              {contact.social.twitter && (
                <a href={contact.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-base transition-all hover:bg-white/10 hover:scale-110 sm:h-10 sm:w-10 sm:text-lg">
                  🐦
                </a>
              )}
              {contact.social.instagram && (
                <a href={contact.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white transition-all hover:bg-white/10 hover:scale-110 sm:h-10 sm:w-10">
                  <Image src={contact.socialLogos.instagram} alt="" width={24} height={24} className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              )}
              {contact.social.linkedin && (
                <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-base transition-all hover:bg-white/10 hover:scale-110 sm:h-10 sm:w-10 sm:text-lg">
                  💼
                </a>
              )}
              {contact.social.youtube && (
                <a href={contact.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-base transition-all hover:bg-white/10 hover:scale-110 sm:h-10 sm:w-10 sm:text-lg">
                  📺
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className={`mb-4 ${typo.sectionTitle} text-white sm:mb-6`}>
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/courses', label: 'Courses' },
                { href: '/about', label: 'About Us' },
                { href: '/testimonials', label: 'Testimonials' },
                { href: '/inquiry', label: 'Enquiry' },
                { href: '/faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="lg:col-span-2">
            <h3 className={`mb-4 ${typo.sectionTitle} text-white sm:mb-6`}>
              Courses
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Commerce'].map((subject) => (
                <li key={subject}>
                  <Link
                    href={`/courses?category=${subject}`}
                    className="group flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                    {subject}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className={`mb-4 ${typo.sectionTitle} text-white sm:mb-6`}>
              Contact Us
            </h3>
            <div className="mb-4 space-y-2 text-sm text-slate-400 sm:mb-6 sm:space-y-3">
              <p className="flex items-start gap-2">
                <span className="flex-shrink-0">📍</span>{' '}
                <span>
                  {contact.address}{' '}
                  <a
                    href={contact.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.textLink} underline`}
                  >
                    View on Map
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span> {contact.phonesDisplay[0]}
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span> {contact.phonesDisplay[1]}
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span> {contact.phonesDisplay[2]}
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span> <span className="break-all">{contact.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>⏰</span> {contact.hours}
              </p>
            </div>

            {/* Newsletter */}
            <div className="rounded-xl bg-white/5 p-3 sm:p-4">
              <p className="mb-2 text-sm font-medium text-white sm:mb-3">Subscribe for updates</p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/20 p-3 text-sm text-emerald-400">
                  <span>✓</span> Successfully subscribed!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none sm:px-4"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-shrink-0 rounded-lg ${theme.gradientBrandText} px-3 py-2 text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary-500/30 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4`}
                  >
                    {isLoading ? '...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:mt-12 sm:gap-4 sm:pt-8 md:flex-row">
          <p className="text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} Mirza Study Centre. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 sm:gap-4 sm:text-sm">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Made with ❤️ for students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
