/**
 * Mirza Study Centre - Centralized Color Palette
 *
 * Primary (light): Cobalt Blue  #1A5799  rgb(26,87,153)
 * Dark surfaces:   Eerie Black  #1F1F1F  rgb(31,31,31)
 *
 * Custom scales are registered in globals.css @theme:
 *   primary-50 … primary-950   (Cobalt Blue)
 *   dark-700 … dark-950        (Eerie Black)
 */

export const colors = {
  primary: {
    50: '#EFF6FF', 100: '#D6E8F7', 200: '#ADCFEF', 300: '#7FB2E2',
    400: '#4E93D2', 500: '#2478B8', 600: '#1A5799', 700: '#164A82',
    800: '#123C6B', 900: '#0E2F55', 950: '#091D37',
  },
  dark: { 700: '#404040', 800: '#2D2D2D', 900: '#1F1F1F', 950: '#141414' },
  slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 900: '#0f172a' },
  emerald: { 100: '#d1fae5', 400: '#34d399', 500: '#10b981', 700: '#059669' },
  amber: { 100: '#fef3c7', 400: '#fbbf24', 700: '#b45309' },
  red: { 50: '#fef2f2', 400: '#f87171', 600: '#dc2626', 700: '#b91c1c' },
  blue: { 100: '#dbeafe', 400: '#60a5fa', 700: '#1d4ed8' },
} as const;

/** Tailwind class tokens - import `theme` in components */
export const theme = {
  /* ── Text ─────────────────────────────── */
  textHeading: 'text-slate-900 dark:text-white',
  textBody: 'text-slate-600 dark:text-slate-400',
  textMuted: 'text-slate-500 dark:text-slate-400',
  textFaint: 'text-slate-400',
  textWhite: 'text-white',
  textAccent: 'text-primary-600 dark:text-primary-400',
  textLink: 'text-primary-400 hover:text-primary-300',

  /* ── Backgrounds ──────────────────────── */
  bgPage: 'bg-slate-50 dark:bg-dark-950',
  bgCard: 'bg-white dark:bg-dark-900',
  bgSubtle: 'bg-slate-50 dark:bg-dark-800',
  bgFooter: 'bg-slate-900 dark:bg-dark-950',
  bgOverlay: 'bg-white/5',

  /* ── Borders ──────────────────────────── */
  borderCard: 'border-slate-200 dark:border-dark-800',
  borderInput: 'border-slate-300 dark:border-dark-700',
  borderSubtle: 'border-white/10',

  /* ── Brand gradient ──────────────────── */
  gradientBrand: 'bg-gradient-to-br from-primary-500 to-primary-700',
  gradientBrandText: 'bg-gradient-to-r from-primary-600 to-primary-700',
  gradientHero: 'bg-gradient-to-br from-dark-950 via-primary-900 to-dark-950',

  /* ── Primary button ──────────────────── */
  btnPrimary: 'rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30',
  btnOutline: 'rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-dark-700 dark:bg-dark-800 dark:text-slate-300 dark:hover:bg-dark-700',

  /* ── Cards ────────────────────────────── */
  card: 'rounded-xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900',
  cardHover: 'rounded-xl border border-slate-200 bg-white transition-all hover:shadow-lg hover:border-slate-300 dark:border-dark-800 dark:bg-dark-900 dark:hover:border-dark-700',

  /* ── Inputs ───────────────────────────── */
  input: 'rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-dark-700 dark:bg-dark-800 dark:text-white',

  /* ── Status badges ────────────────────── */
  badgeNew: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  badgeActive: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  badgeSuccess: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  badgeWarning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  badgeError: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  badgeAdmin: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',

  /* ── Focus ring ───────────────────────── */
  focusRing: 'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',

  /* ── Spinner ──────────────────────────── */
  spinner: 'border-primary-200 border-t-primary-600',

  /* ── Decorative blurs ─────────────────── */
  blurViolet: 'bg-primary-500/10 blur-3xl',
  blurPurple: 'bg-primary-700/10 blur-3xl',
} as const;

/** Status color map for dynamic lookups */
export const statusColors: Record<string, string> = {
  new: theme.badgeNew,
  contacted: theme.badgeWarning,
  resolved: theme.badgeSuccess,
  active: theme.badgeActive,
  completed: theme.badgeSuccess,
  paid: theme.badgeSuccess,
  pending: theme.badgeWarning,
};

export type Theme = typeof theme;
