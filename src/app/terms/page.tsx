import type { Metadata } from 'next';
import Link from 'next/link';
import { theme, typo } from '@/styles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Mirza Study Centre website.',
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-dark-950">
      <Header />

      <section className="flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className={`mb-6 text-3xl font-bold sm:text-4xl ${theme.textHeading}`}>
            Terms of Service
          </h1>
          <p className={`mb-8 text-sm ${theme.textBody}`}>
            Last updated: {new Date().toLocaleDateString('en-IN')}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300">
            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the Mirza Study Centre website, you accept and agree to be
                bound by these Terms of Service. If you do not agree, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                2. Use of Services
              </h2>
              <p>
                Our website provides information about our coaching centre, courses, and allows you to
                submit inquiries. You agree to use the website only for lawful purposes and in a
                manner that does not infringe the rights of others.
              </p>
            </section>

            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                3. Fees and Payment
              </h2>
              <p>
                Course fees are subject to change. Please contact us for current fee structure.
                Payment terms will be communicated at the time of admission.
              </p>
            </section>

            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                4. Intellectual Property
              </h2>
              <p>
                All content on this website, including text, images, and logos, is the property of
                Mirza Study Centre and may not be reproduced without permission.
              </p>
            </section>

            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                5. Limitation of Liability
              </h2>
              <p>
                Mirza Study Centre is not liable for any indirect, incidental, or consequential
                damages arising from the use of this website. We strive to provide accurate
                information but do not warrant that all content is error-free.
              </p>
            </section>

            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                6. Contact
              </h2>
              <p>
                For questions about these Terms of Service, contact us at{' '}
                <a
                  href="mailto:info@mirzastudycentre.com"
                  className={`${theme.textAccent} hover:underline`}
                >
                  info@mirzastudycentre.com
                </a>{' '}
                or visit our{' '}
                <Link href="/inquiry" className={`${theme.textAccent} hover:underline`}>
                  Inquiry page
                </Link>
                .
              </p>
            </section>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 ${theme.textLink}`}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
