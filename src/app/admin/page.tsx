'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

// ─── Types ──────────────────────────────────────────
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

interface Student {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  enrollmentCount: number;
}

interface Enrollment {
  _id: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  courseCategory: string;
  enrolledAt: string;
  progress: number;
  status: string;
  paymentStatus: string;
}

interface AttendanceSummary {
  enrollmentId: string;
  total: number;
  present: number;
  absent: number;
  percentage: number;
}

type Tab = 'inquiries' | 'students' | 'enrollments' | 'attendance';

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  contacted: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  active: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('inquiries');
  const [isLoading, setIsLoading] = useState(true);

  // Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inqFilter, setInqFilter] = useState<string>('all');

  // Students state
  const [students, setStudents] = useState<Student[]>([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentPage, setStudentPage] = useState(1);
  const [studentPages, setStudentPages] = useState(1);

  // Enrollments state
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [enrollFilter, setEnrollFilter] = useState<string>('all');

  // Attendance state
  const [attEnrollmentId, setAttEnrollmentId] = useState<string>('');
  const [attDate, setAttDate] = useState(new Date().toISOString().split('T')[0]);
  const [attSummaries, setAttSummaries] = useState<Map<string, AttendanceSummary>>(new Map());
  const [attMarking, setAttMarking] = useState(false);

  const [error, setError] = useState('');

  // ─── Data Fetching ──────────────────────────────
  const fetchInquiries = useCallback(async () => {
    const res = await fetch('/api/inquiry');
    if (res.status === 401) { router.push('/login'); return; }
    if (res.status === 403) { router.push('/feed'); return; }
    const data = await res.json();
    if (data.success) setInquiries(data.inquiries);
  }, [router]);

  const fetchStudents = useCallback(async (page = 1, search = '') => {
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    if (search) params.set('search', search);
    const res = await fetch(`/api/admin/students?${params}`);
    if (res.status === 401) { router.push('/login'); return; }
    if (res.status === 403) { router.push('/feed'); return; }
    const data = await res.json();
    if (data.success) {
      setStudents(data.students);
      setStudentPages(data.pagination.pages);
    }
  }, [router]);

  const fetchEnrollments = useCallback(async () => {
    const res = await fetch('/api/admin/enrollments');
    if (res.status === 401) { router.push('/login'); return; }
    if (res.status === 403) { router.push('/feed'); return; }
    const data = await res.json();
    if (data.success) setEnrollments(data.enrollments);
  }, [router]);

  // Lazy-load tab data: only fetch when tab becomes active
  const [fetchedTabs, setFetchedTabs] = useState<Set<Tab>>(new Set());

  useEffect(() => {
    setFetchedTabs((prev) => {
      const next = new Set(prev);
      if (!next.has(activeTab)) next.add(activeTab);
      return next;
    });
  }, [activeTab]);

  useEffect(() => {
    if (fetchedTabs.size === 0) return;
    const tasks: Promise<void>[] = [];
    if (fetchedTabs.has('inquiries')) tasks.push(fetchInquiries());
    if (fetchedTabs.has('students')) tasks.push(fetchStudents(1, studentSearch));
    if (fetchedTabs.has('enrollments') || fetchedTabs.has('attendance')) tasks.push(fetchEnrollments());
    if (tasks.length === 0) {
      setIsLoading(false);
      return;
    }
    Promise.all(tasks)
      .catch(() => setError('Failed to load data.'))
      .finally(() => setIsLoading(false));
  }, [fetchedTabs, fetchInquiries, fetchStudents, fetchEnrollments, studentSearch]);

  // ─── Actions ────────────────────────────────────
  const updateInquiryStatus = async (id: string, newStatus: string) => {
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
  };

  const updateEnrollment = async (enrollmentId: string, field: string, value: string | number) => {
    const res = await fetch('/api/admin/enrollments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enrollmentId, [field]: value }),
    });
    const data = await res.json();
    if (data.success) {
      setEnrollments((prev) =>
        prev.map((e) => (e._id === enrollmentId ? { ...e, [field]: value } : e))
      );
    }
  };

  const handleStudentSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentPage(1);
    fetchStudents(1, studentSearch);
  };

  const fetchAttendanceSummary = async (enrollmentId: string) => {
    const res = await fetch(`/api/admin/attendance?enrollmentId=${enrollmentId}`);
    const data = await res.json();
    if (data.success) {
      setAttSummaries((prev) => new Map(prev).set(enrollmentId, { enrollmentId, ...data.summary }));
    }
  };

  const markAttendance = async (enrollmentId: string, status: 'present' | 'absent') => {
    setAttMarking(true);
    try {
      const res = await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId, date: attDate, status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAttendanceSummary(enrollmentId);
      }
    } catch { /* silent */ }
    setAttMarking(false);
  };

  // ─── Computed Values ────────────────────────────
  const inqCounts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
    resolved: inquiries.filter((i) => i.status === 'resolved').length,
  };
  const filteredInquiries = inqFilter === 'all' ? inquiries : inquiries.filter((i) => i.status === inqFilter);
  const filteredEnrollments = enrollFilter === 'all' ? enrollments : enrollments.filter((e) => e.paymentStatus === enrollFilter);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'inquiries', label: 'Inquiries', count: inquiries.length },
    { id: 'students', label: 'Students', count: students.length },
    { id: 'enrollments', label: 'Enrollments', count: enrollments.length },
    { id: 'attendance', label: 'Attendance', count: enrollments.filter((e) => e.status === 'active').length },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
          <p className="text-slate-600 dark:text-slate-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-zinc-950">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fade-up">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-slate-300 sm:text-base">Manage students, enrollments, and inquiries</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors sm:px-6 sm:py-4 ${
                activeTab === tab.id
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                {tab.count}
              </span>
              {activeTab === tab.id && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-violet-600 dark:bg-violet-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          {/* ─── Inquiries Tab ─────────────────── */}
          {activeTab === 'inquiries' && (
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                {(['all', 'new', 'contacted', 'resolved'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setInqFilter(s)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      inqFilter === s
                        ? 'border-violet-500 bg-violet-50 dark:border-violet-400 dark:bg-violet-900/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-zinc-800 dark:bg-zinc-900'
                    }`}
                  >
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{inqCounts[s]}</p>
                    <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{s === 'all' ? 'Total' : s}</p>
                  </button>
                ))}
                </div>
                {filteredInquiries.length > 0 && (
                  <button
                    onClick={() => {
                      const headers = ['Date', 'Name', 'Email', 'Phone', 'Class', 'Subject', 'Message', 'Status'];
                      const rows = filteredInquiries.map((i) => [
                        new Date(i.createdAt).toISOString(),
                        `"${(i.name || '').replace(/"/g, '""')}"`,
                        i.email || '',
                        i.phone || '',
                        i.class || '',
                        i.subject || '',
                        `"${(i.message || '').replace(/"/g, '""')}"`,
                        i.status || '',
                      ]);
                      const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
                      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-slate-300 dark:hover:bg-zinc-700"
                  >
                    Export CSV
                  </button>
                )}
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-slate-500 dark:text-slate-400">No inquiries found.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredInquiries.map((inq) => (
                    <div key={inq._id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{inq.name}</h3>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[inq.status]}`}>
                              {inq.status}
                            </span>
                          </div>
                          <div className="space-y-0.5 text-sm text-slate-600 dark:text-slate-400">
                            <p>{inq.email} &bull; {inq.phone}</p>
                            <p>{inq.class} &bull; {inq.subject}</p>
                            {inq.message && <p className="text-slate-500">&ldquo;{inq.message}&rdquo;</p>}
                            <p className="text-xs text-slate-400">
                              {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 sm:flex-col">
                          {inq.status !== 'contacted' && (
                            <button onClick={() => updateInquiryStatus(inq._id, 'contacted')} className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400">
                              Contacted
                            </button>
                          )}
                          {inq.status !== 'resolved' && (
                            <button onClick={() => updateInquiryStatus(inq._id, 'resolved')} className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400">
                              Resolved
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── Students Tab ──────────────────── */}
          {activeTab === 'students' && (
            <div>
              <form onSubmit={handleStudentSearch} className="mb-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
                <button type="submit" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">
                  Search
                </button>
              </form>

              {students.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-slate-500 dark:text-slate-400">No students found.</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-slate-200 bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800">
                        <tr>
                          <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Name</th>
                          <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Email</th>
                          <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Role</th>
                          <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Courses</th>
                          <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                        {students.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                            <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{s.name}</td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{s.email}</td>
                            <td className="px-4 py-3">
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                s.role === 'admin' ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400' : 'bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-slate-400'
                              }`}>
                                {s.role}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{s.enrollmentCount}</td>
                            <td className="px-4 py-3 text-xs text-slate-500">
                              {s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {studentPages > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <button
                        disabled={studentPage <= 1}
                        onClick={() => { setStudentPage(studentPage - 1); fetchStudents(studentPage - 1, studentSearch); }}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-40 dark:border-zinc-700"
                      >
                        Prev
                      </button>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Page {studentPage} of {studentPages}
                      </span>
                      <button
                        disabled={studentPage >= studentPages}
                        onClick={() => { setStudentPage(studentPage + 1); fetchStudents(studentPage + 1, studentSearch); }}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-40 dark:border-zinc-700"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ─── Enrollments Tab ───────────────── */}
          {activeTab === 'enrollments' && (
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {['all', 'pending', 'paid'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setEnrollFilter(f)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                      enrollFilter === f
                        ? 'bg-violet-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-zinc-800 dark:text-slate-400'
                    }`}
                  >
                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? enrollments.length : enrollments.filter((e) => e.paymentStatus === f).length})
                  </button>
                ))}
              </div>

              {filteredEnrollments.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-slate-500 dark:text-slate-400">No enrollments found.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredEnrollments.map((e) => (
                    <div key={e._id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 dark:text-white">{e.studentName}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{e.studentEmail}</p>
                          <p className="mt-1 text-sm text-violet-600 dark:text-violet-400">{e.courseTitle}</p>
                          <p className="text-xs text-slate-400">
                            Enrolled {new Date(e.enrolledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* Progress */}
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Progress:</span>
                            <select
                              value={e.progress}
                              onChange={(ev) => updateEnrollment(e._id, 'progress', Number(ev.target.value))}
                              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                            >
                              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
                                <option key={v} value={v}>{v}%</option>
                              ))}
                            </select>
                          </div>

                          {/* Status */}
                          <button
                            onClick={() => updateEnrollment(e._id, 'status', e.status === 'active' ? 'completed' : 'active')}
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[e.status]}`}
                          >
                            {e.status}
                          </button>

                          {/* Payment */}
                          <button
                            onClick={() => updateEnrollment(e._id, 'paymentStatus', e.paymentStatus === 'pending' ? 'paid' : 'pending')}
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[e.paymentStatus]}`}
                          >
                            {e.paymentStatus}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* ─── Attendance Tab ──────────────── */}
          {activeTab === 'attendance' && (
            <div>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">Date</label>
                  <input
                    type="date"
                    value={attDate}
                    onChange={(e) => setAttDate(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">Course Filter</label>
                  <select
                    value={attEnrollmentId ? enrollments.find((e) => e._id === attEnrollmentId)?.courseId || '' : ''}
                    onChange={(e) => {
                      const courseId = e.target.value;
                      setAttEnrollmentId('');
                      if (courseId) {
                        enrollments
                          .filter((en) => en.courseId === courseId && en.status === 'active')
                          .forEach((en) => fetchAttendanceSummary(en._id));
                      }
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  >
                    <option value="">All Courses</option>
                    {[...new Set(enrollments.filter((e) => e.status === 'active').map((e) => e.courseId))].map((cid) => {
                      const en = enrollments.find((e) => e.courseId === cid);
                      return (
                        <option key={cid} value={cid}>{en?.courseTitle || cid}</option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {enrollments.filter((e) => e.status === 'active').length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-slate-500 dark:text-slate-400">No active enrollments to mark attendance for.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {enrollments
                    .filter((e) => e.status === 'active')
                    .map((e) => {
                      const summary = attSummaries.get(e._id);
                      return (
                        <div key={e._id} className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-slate-900 dark:text-white">{e.studentName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{e.courseTitle}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {summary && (
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                summary.percentage >= 75
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                  : summary.percentage >= 50
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}>
                                {summary.percentage}% ({summary.present}/{summary.total})
                              </span>
                            )}
                            {!summary && (
                              <button
                                onClick={() => fetchAttendanceSummary(e._id)}
                                className="text-xs text-violet-600 hover:text-violet-700 dark:text-violet-400"
                              >
                                Load
                              </button>
                            )}
                            <button
                              disabled={attMarking}
                              onClick={() => markAttendance(e._id, 'present')}
                              className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-40 dark:bg-emerald-900/20 dark:text-emerald-400"
                            >
                              Present
                            </button>
                            <button
                              disabled={attMarking}
                              onClick={() => markAttendance(e._id, 'absent')}
                              className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-40 dark:bg-red-900/20 dark:text-red-400"
                            >
                              Absent
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
