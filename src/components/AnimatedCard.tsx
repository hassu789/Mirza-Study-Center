'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  baseDelay?: number;
  staggerDelay?: number;
}

export default function AnimatedCard({
  children,
  className = '',
  index = 0,
  baseDelay = 0,
  staggerDelay = 100,
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  const delay = baseDelay + index * staggerDelay;

  return (
    <div
      ref={ref}
      className={`h-full ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        transition: `all 500ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
