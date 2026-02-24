/**
 * Mirza Study Centre - Centralized Typography
 * All typography tokens used across the application.
 * Components import `typo` for Tailwind class strings.
 *
 * To change typography site-wide, update the class string here.
 */

/** Raw values (for reference / non-Tailwind use) */
export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
    mono: 'var(--font-geist-mono), ui-monospace, monospace',
  },
  fontSize: {
    xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
    xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem',
  },
  fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeight: { tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625, loose: 2 },
  letterSpacing: { normal: '0', wide: '0.025em', wider: '0.05em' },
} as const;

/** Tailwind class presets - import `typo` in components */
export const typo = {
  /* ── Headings ─────────────────────────── */
  hero: 'text-2xl font-bold sm:text-3xl lg:text-5xl',
  h1: 'text-2xl font-bold sm:text-3xl',
  h2: 'text-lg font-bold sm:text-xl',
  h3: 'text-base font-semibold',
  sectionTitle: 'text-sm font-semibold uppercase tracking-wider',

  /* ── Body ──────────────────────────────── */
  body: 'text-sm sm:text-base',
  bodySmall: 'text-xs sm:text-sm',
  caption: 'text-xs',

  /* ── Labels & UI ──────────────────────── */
  label: 'text-sm font-medium',
  badge: 'rounded-full px-2.5 py-0.5 text-xs font-medium',
  tabActive: 'text-sm font-medium',
  tabInactive: 'text-sm font-medium',

  /* ── Special ──────────────────────────── */
  brandName: 'text-xl font-bold sm:text-2xl',
  stat: 'text-xl font-bold',
} as const;

export type Typo = typeof typo;
export type Typography = typeof typography;
