'use client';

import { theme, typo } from '@/styles';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[error-boundary]', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-dark-950">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 text-6xl">⚠️</div>
        <h1 className={`mb-2 text-2xl font-bold ${theme.textHeading}`}>
          Something went wrong
        </h1>
        <p className={`mb-8 ${theme.textBody}`}>
          An unexpected error occurred. Please try again or go back to the home page.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl"
          >
            Try Again
          </button>
          <a
            href="/"
            className={`rounded-xl border ${theme.borderCard} px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-dark-800`}
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
