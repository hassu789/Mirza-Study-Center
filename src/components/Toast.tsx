'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { theme } from '@/styles';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return { showToast: () => {} };
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const toastColors: Record<ToastType, string> = {
    success: `bg-emerald-600 ${theme.textWhite} border-emerald-500`,
    error: `bg-red-600 ${theme.textWhite} border-red-500`,
    info: 'bg-slate-800 text-white border-slate-600 dark:bg-slate-700',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-24 right-4 z-[100] flex flex-col gap-2 sm:bottom-28 sm:right-6"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto min-w-[240px] max-w-sm rounded-lg border px-4 py-3 text-sm font-medium shadow-lg ${toastColors[t.type]}`}
            role="alert"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
