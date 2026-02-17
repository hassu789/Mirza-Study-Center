'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

const statusColors = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  contacted: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export default function AdminPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiry');
      const data = await res.json();

      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (res.status === 403) {
        router.push('/feed');
        return;
      }

      if (data.success) {
        setInquiries(data.inquiries);
      } else {
        setError(data.error || 'Failed to load inquiries');
      }
    } catch {
      setError('Failed to connect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/inquiry', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus as Inquiry['status'] } : inq))
        );
      }
    } catch {
      // Silently fail, user can retry
    }
  };

  const filtered = filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter);

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
    resolved: inquiries.filter((i) => i.status === 'resolved').length,
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-zinc-950">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Admin Dashboard</h1>
            <p className="mt-2 text-slate-300">Manage student inquiries</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {(['all', 'new', 'contacted', 'resolved'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  filter === status
                    ? 'border-violet-500 bg-violet-50 dark:border-violet-400 dark:bg-violet-900/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-zinc-800 dark:bg-zinc-900'
                }`}
              >
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{counts[status]}</p>
                <p className="text-sm capitalize text-slate-500 dark:text-slate-400">{status === 'all' ? 'Total' : status}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiries List */}
      <section className="flex-1 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-lg text-slate-500 dark:text-slate-400">No inquiries found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((inquiry) => (
                <div
                  key={inquiry._id}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white">{inquiry.name}</h3>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[inquiry.status]}`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        <p>
                          <span className="font-medium">Email:</span> {inquiry.email} &nbsp;|&nbsp;
                          <span className="font-medium">Phone:</span> {inquiry.phone}
                        </p>
                        <p>
                          <span className="font-medium">Class:</span> {inquiry.class} &nbsp;|&nbsp;
                          <span className="font-medium">Subject:</span> {inquiry.subject}
                        </p>
                        {inquiry.message && (
                          <p className="mt-2 text-slate-500 dark:text-slate-500">
                            &ldquo;{inquiry.message}&rdquo;
                          </p>
                        )}
                        <p className="text-xs text-slate-400">
                          {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Status actions */}
                    <div className="flex gap-2 sm:flex-col">
                      {inquiry.status !== 'contacted' && (
                        <button
                          onClick={() => updateStatus(inquiry._id, 'contacted')}
                          className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400"
                        >
                          Mark Contacted
                        </button>
                      )}
                      {inquiry.status !== 'resolved' && (
                        <button
                          onClick={() => updateStatus(inquiry._id, 'resolved')}
                          className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
