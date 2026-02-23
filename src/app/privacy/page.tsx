import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Mirza Study Centre website.',
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />

      <section className="flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mb-8 text-sm text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString('en-IN')}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                1. Information We Collect
              </h2>
              <p>
                When you use our inquiry form, we collect your name, email, phone number, class, subject
                interest, and message. This information is used solely to respond to your inquiry and
                provide the educational services you request.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                2. How We Use Your Information
              </h2>
              <p>
                We use the information you provide to contact you regarding your inquiry, send
                important updates about our courses, and improve our services. We do not sell or
                share your personal information with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                3. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your personal information
                against unauthorized access, alteration, or destruction.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                4. Cookies
              </h2>
              <p>
                Our website may use cookies for essential functionality and to improve your
                browsing experience. You can control cookie settings through your browser.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                5. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a
                  href="mailto:info@mirzastudycentre.com"
                  className="text-violet-600 hover:underline dark:text-violet-400"
                >
                  info@mirzastudycentre.com
                </a>{' '}
                or visit our{' '}
                <Link href="/inquiry" className="text-violet-600 hover:underline dark:text-violet-400">
                  Inquiry page
                </Link>
                .
              </p>
            </section>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
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
