import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className="mb-6 text-8xl font-bold text-violet-600">404</div>
          <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 font-semibold text-slate-700 transition-all hover:border-violet-200 hover:bg-violet-50 dark:border-zinc-700 dark:text-slate-300 dark:hover:border-violet-800 dark:hover:bg-violet-900/20"
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
