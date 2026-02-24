import Link from 'next/link';
import { theme, typo } from '@/styles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-dark-950">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className={`mb-6 text-8xl font-bold ${theme.textAccent}`}>404</div>
          <h1 className={`mb-4 text-3xl font-bold ${theme.textHeading}`}>
            Page Not Found
          </h1>
          <p className={`mb-8 ${theme.textBody}`}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
            <Link
              href="/courses"
              className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 ${theme.borderCard} px-6 py-3 font-semibold transition-all hover:border-primary-200 hover:bg-primary-50 dark:hover:border-primary-800 dark:hover:bg-primary-900/20 ${theme.textBody}`}
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
