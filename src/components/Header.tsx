'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        setUser(data.authenticated ? data.user : null);
      })
      .catch(() => setUser(null));
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setShowUserMenu(false);
    router.push('/');
    router.refresh();
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/faq', label: 'FAQ' },
    { href: '/inquiry', label: 'Enquire' },
    ...(user ? [{ href: '/feed', label: 'Dashboard' }] : []),
    ...(user?.role === 'admin' ? [{ href: '/admin', label: 'Admin' }] : []),
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'border-b border-slate-200/80 bg-white/95 shadow-lg shadow-slate-200/20 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/95 dark:shadow-black/20'
        : 'bg-white dark:bg-zinc-950'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="group flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition-all group-hover:scale-105 group-hover:shadow-xl sm:h-10 sm:w-10 sm:text-lg lg:h-11 lg:w-11">
              MSC
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl lg:text-2xl">
              Mirza Study Centre
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User menu"
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition-all hover:border-slate-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-600"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-sm font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden xl:inline">{user.name}</span>
                  <svg className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                      <div className="border-b border-slate-100 p-4 dark:border-zinc-800">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Signed in as</p>
                        <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/feed"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-zinc-800"
                        >
                          <span>📊</span> Dashboard
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-zinc-800"
                          >
                            <span>🔧</span> Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          <span>🚪</span> Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-zinc-700 dark:text-slate-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="btn-shine rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-zinc-800 lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 dark:border-zinc-800 lg:hidden">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-zinc-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 dark:border-zinc-800">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-slate-500">
                    Welcome, <span className="font-medium text-slate-900 dark:text-white">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-red-50 px-4 py-3 font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block rounded-xl border border-slate-200 px-4 py-3 text-center font-medium text-slate-700 dark:border-zinc-700 dark:text-slate-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 text-center font-semibold text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
