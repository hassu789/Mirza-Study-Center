'use client';

import { theme, typo } from '@/styles';
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
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-dark-950">
        <div className={`mx-auto h-12 w-12 animate-spin rounded-full border-4 ${theme.spinner}`}></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className={`flex min-h-screen flex-col ${theme.bgPage}`}>
      <Header />

      {/* Hero */}
      <section className={`${theme.gradientHero} px-4 py-10 sm:px-6 sm:py-14 lg:px-8`}>
        <div className="mx-auto max-w-4xl">
          <AnimatedSection animation="fade-up">
            <Link href="/feed" className="mb-4 inline-flex items-center gap-2 text-xs text-white/70 hover:text-white sm:text-sm">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-2xl font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-3xl">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">{profile.name}</h1>
                <p className="text-sm text-slate-300">{profile.email}</p>
                <span className="mt-1 inline-block rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-primary-300">
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
            <div className={`rounded-2xl border ${theme.borderCard} ${theme.bgCard} p-4 text-center`}>
              <p className={`text-2xl font-bold ${theme.textAccent}`}>{stats.enrollmentCount}</p>
              <p className={`text-xs sm:text-sm ${theme.textMuted}`}>Courses</p>
            </div>
            <div className={`rounded-2xl border ${theme.borderCard} ${theme.bgCard} p-4 text-center`}>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.inquiryCount}</p>
              <p className={`text-xs sm:text-sm ${theme.textMuted}`}>Inquiries</p>
            </div>
            <div className={`rounded-2xl border ${theme.borderCard} ${theme.bgCard} p-4 text-center`}>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : '—'}
              </p>
              <p className={`text-xs sm:text-sm ${theme.textMuted}`}>Joined</p>
            </div>
          </div>

          {/* Edit Name */}
          <div className={`rounded-2xl border ${theme.borderCard} ${theme.bgCard} p-4 sm:p-6`}>
            <h2 className={`mb-4 text-lg font-semibold ${theme.textHeading}`}>Personal Information</h2>

            <div className="space-y-4">
              <div>
                <label className={`mb-1 block text-sm font-medium ${theme.textBody}`}>Full Name</label>
                {editingName ? (
                  <div className="flex gap-2">
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className={`flex-1 ${theme.input}`}
                    />
                    <button
                      onClick={handleNameUpdate}
                      disabled={nameSaving}
                      className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50"
                    >
                      {nameSaving ? '...' : 'Save'}
                    </button>
                    <button
                      onClick={() => { setEditingName(false); setNewName(profile.name); }}
                      className={`rounded-xl border ${theme.borderCard} px-4 py-2.5 text-sm ${theme.textBody} hover:bg-slate-50 dark:border-dark-700 dark:hover:bg-dark-800`}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme.textHeading}`}>{profile.name}</span>
                    <button
                      onClick={() => setEditingName(true)}
                      className={`text-sm font-semibold ${theme.textAccent} hover:text-primary-700`}
                    >
                      Edit
                    </button>
                  </div>
                )}
                {nameMsg && <p className="mt-1 text-xs text-emerald-600">{nameMsg}</p>}
              </div>

              <div>
                <label className={`mb-1 block text-sm font-medium ${theme.textBody}`}>Email</label>
                <span className={`text-sm ${theme.textHeading}`}>{profile.email}</span>
                <p className="text-xs text-slate-400">Email cannot be changed</p>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className={`rounded-2xl border ${theme.borderCard} ${theme.bgCard} p-4 sm:p-6`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${theme.textHeading}`}>Password</h2>
              {!showPasswordForm && (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className={`text-sm font-semibold ${theme.textAccent} hover:text-primary-700`}
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
                  className={`w-full ${theme.input}`}
                />
                <input
                  type="password"
                  placeholder="New password (min 6 characters)"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full ${theme.input}`}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={pwSaving}
                    className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50"
                  >
                    {pwSaving ? 'Saving...' : 'Update Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowPasswordForm(false); setCurrentPassword(''); setNewPassword(''); setPwMsg(''); }}
                    className={`rounded-xl border ${theme.borderCard} px-5 py-2.5 text-sm ${theme.textBody} hover:bg-slate-50 dark:hover:bg-dark-800`}
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
