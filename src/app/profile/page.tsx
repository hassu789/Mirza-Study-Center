'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { useToast } from '@/components/Toast';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface ProfileStats {
  enrollmentCount: number;
  inquiryCount: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<ProfileStats>({ enrollmentCount: 0, inquiryCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Edit name
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameMsg, setNameMsg] = useState('');
  const [nameSaving, setNameSaving] = useState(false);

  // Change password
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setProfile(data.user);
          setStats(data.stats);
          setNewName(data.user.name);
        } else {
          router.push('/login');
        }
        setIsLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  const handleNameUpdate = async () => {
    setNameSaving(true);
    setNameMsg('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (data.success) {
        setProfile((p) => p ? { ...p, name: newName } : p);
        setEditingName(false);
        setNameMsg('Name updated!');
        showToast('Name updated successfully!', 'success');
        setTimeout(() => setNameMsg(''), 3000);
      } else {
        setNameMsg(data.error || 'Failed to update');
      }
    } catch {
      setNameMsg('Something went wrong');
    } finally {
      setNameSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwSaving(true);
    setPwMsg('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setPwMsg('Password changed successfully!');
        showToast('Password changed successfully!', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setShowPasswordForm(false);
        setTimeout(() => setPwMsg(''), 3000);
      } else {
        setPwMsg(data.error || 'Failed to change password');
      }
    } catch {
      setPwMsg('Something went wrong');
    } finally {
      setPwSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-zinc-950">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection animation="fade-up">
            <Link href="/feed" className="mb-4 inline-flex items-center gap-2 text-xs text-white/70 hover:text-white sm:text-sm">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-2xl font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-3xl">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">{profile.name}</h1>
                <p className="text-sm text-slate-300">{profile.email}</p>
                <span className="mt-1 inline-block rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-violet-300">
                  {profile.role === 'admin' ? 'Admin' : 'Student'}
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">{stats.enrollmentCount}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Courses</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.inquiryCount}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Inquiries</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : '—'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Joined</p>
            </div>
          </div>

          {/* Edit Name */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Personal Information</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">Full Name</label>
                {editingName ? (
                  <div className="flex gap-2">
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                    />
                    <button
                      onClick={handleNameUpdate}
                      disabled={nameSaving}
                      className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-violet-700 disabled:opacity-50"
                    >
                      {nameSaving ? '...' : 'Save'}
                    </button>
                    <button
                      onClick={() => { setEditingName(false); setNewName(profile.name); }}
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-slate-400"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-900 dark:text-white">{profile.name}</span>
                    <button
                      onClick={() => setEditingName(true)}
                      className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
                    >
                      Edit
                    </button>
                  </div>
                )}
                {nameMsg && <p className="mt-1 text-xs text-emerald-600">{nameMsg}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">Email</label>
                <span className="text-sm text-slate-900 dark:text-white">{profile.email}</span>
                <p className="text-xs text-slate-400">Email cannot be changed</p>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Password</h2>
              {!showPasswordForm && (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
                >
                  Change Password
                </button>
              )}
            </div>

            {pwMsg && (
              <p className={`mt-2 text-sm ${pwMsg.includes('success') ? 'text-emerald-600' : 'text-red-600'}`}>
                {pwMsg}
              </p>
            )}

            {showPasswordForm && (
              <form onSubmit={handlePasswordChange} className="mt-4 space-y-3">
                <input
                  type="password"
                  placeholder="Current password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
                <input
                  type="password"
                  placeholder="New password (min 6 characters)"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={pwSaving}
                    className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-violet-700 disabled:opacity-50"
                  >
                    {pwSaving ? 'Saving...' : 'Update Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowPasswordForm(false); setCurrentPassword(''); setNewPassword(''); setPwMsg(''); }}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
