import type { Metadata } from 'next';
import Link from 'next/link';
import { theme, typo } from '@/styles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Mirza Study Centre website.',
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-dark-950">
      <Header />

      <section className="flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className={`mb-6 text-3xl font-bold sm:text-4xl ${theme.textHeading}`}>
            Privacy Policy
          </h1>
          <p className={`mb-8 text-sm ${theme.textBody}`}>
            Last updated: {new Date().toLocaleDateString('en-IN')}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300">
            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                1. Information We Collect
              </h2>
              <p>
                When you use our inquiry form, we collect your name, email, phone number, class, subject
                interest, and message. This information is used solely to respond to your inquiry and
                provide the educational services you request.
              </p>
            </section>

            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                2. How We Use Your Information
              </h2>
              <p>
                We use the information you provide to contact you regarding your inquiry, send
                important updates about our courses, and improve our services. We do not sell or
                share your personal information with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                3. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your personal information
                against unauthorized access, alteration, or destruction.
              </p>
            </section>

            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                4. Cookies
              </h2>
              <p>
                Our website may use cookies for essential functionality and to improve your
                browsing experience. You can control cookie settings through your browser.
              </p>
            </section>

            <section>
              <h2 className={`mb-3 text-xl font-semibold ${theme.textHeading}`}>
                5. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a
                  href="mailto:info@mirzastudycentre.com"
                  className="text-primary-600 hover:underline dark:text-primary-400"
                >
                  info@mirzastudycentre.com
                </a>{' '}
                or visit our{' '}
                <Link href="/inquiry" className="text-primary-600 hover:underline dark:text-primary-400">
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
