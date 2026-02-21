'use client';

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
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-zinc-950">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 text-6xl">⚠️</div>
        <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          Something went wrong
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          An unexpected error occurred. Please try again or go back to the home page.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl"
          >
            Try Again
          </button>
          <a
            href="/"
            className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-zinc-700 dark:text-slate-300 dark:hover:bg-zinc-800"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
