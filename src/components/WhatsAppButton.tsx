'use client';

import { useState, useEffect } from 'react';

const PHONE = '919670212323';
const MESSAGE = encodeURIComponent(
  'Hi! I am interested in coaching at Mirza Study Centre. Please share details.'
);

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay so it doesn't flash during SSR hydration
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-green-500/40 sm:h-16 sm:w-16"
    >
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-7 w-7 sm:h-8 sm:w-8"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.89 15.89 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.322-5.656-1.216-4.748-1.966-7.804-6.794-8.038-7.108-.226-.314-1.886-2.512-1.886-4.792s1.194-3.4 1.618-3.866c.424-.466.924-.582 1.232-.582.308 0 .616.002.886.016.284.014.666-.108.942.718.39 1.1.892 2.678.97 2.872.078.194.13.42.026.674-.104.254-.156.412-.312.636-.156.224-.328.5-.468.672-.156.188-.318.392-.137.77.182.376.808 1.332 1.734 2.158 1.192 1.062 2.196 1.392 2.508 1.546.312.156.494.13.676-.078.182-.208.778-.908 .986-1.22.208-.312.416-.26.7-.156.284.104 1.8.85 2.108 1.004.312.156.518.232.596.36.078.128.078.746-.312 1.466z" />
      </svg>
    </a>
  );
}
