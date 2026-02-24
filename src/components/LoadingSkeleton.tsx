import { theme } from '@/styles';

export function PageSkeleton() {
  return (
    <div className={`flex min-h-screen flex-col bg-white dark:bg-dark-950`}>
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-950">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-dark-800" />
            <div className="h-5 w-40 animate-pulse rounded-lg bg-slate-200 dark:bg-dark-800" />
          </div>
          <div className="hidden gap-2 lg:flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-dark-800" />
            ))}
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto h-8 w-64 animate-pulse rounded-lg bg-white/10" />
          <div className="mx-auto mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-white/10" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className={`overflow-hidden rounded-2xl border ${theme.borderCard} ${theme.bgCard}`}>
      <div className="h-40 animate-pulse bg-slate-200 dark:bg-dark-800" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-dark-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-dark-800" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-dark-800" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className={`flex min-h-screen flex-col ${theme.bgPage}`}>
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-950">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-dark-800" />
            <div className="h-5 w-40 animate-pulse rounded-lg bg-slate-200 dark:bg-dark-800" />
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className={`${theme.gradientHero} px-4 py-12 sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
          <div className="mt-2 h-8 w-48 animate-pulse rounded-lg bg-white/10" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900" />
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900" />
            </div>
            <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
