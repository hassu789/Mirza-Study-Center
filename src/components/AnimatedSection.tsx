'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
}: AnimatedSectionProps) {
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
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [threshold]);

  const getAnimationStyles = () => {
    const baseStyles = {
      opacity: isVisible ? 1 : 0,
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
    };

    const transforms: Record<string, string> = {
      'fade-up': isVisible ? 'translateY(0)' : 'translateY(40px)',
      'fade-down': isVisible ? 'translateY(0)' : 'translateY(-40px)',
      'fade-left': isVisible ? 'translateX(0)' : 'translateX(40px)',
      'fade-right': isVisible ? 'translateX(0)' : 'translateX(-40px)',
      'zoom-in': isVisible ? 'scale(1)' : 'scale(0.9)',
      'zoom-out': isVisible ? 'scale(1)' : 'scale(1.1)',
    };

    return {
      ...baseStyles,
      transform: transforms[animation],
    };
  };

  return (
    <div ref={ref} style={getAnimationStyles()} className={className}>
      {children}
    </div>
  );
}
