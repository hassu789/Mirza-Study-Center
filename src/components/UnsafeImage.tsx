'use client';

import Image from 'next/image';

interface UnsafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  [key: string]: any;
}

export default function UnsafeImage({ src, alt, fill, width, height, className, priority, ...props }: UnsafeImageProps) {
  // In development, use regular img tag to bypass SSL certificate issues
  if (process.env.NODE_ENV === 'development') {
    if (fill) {
      return (
        <img
          src={src}
          alt={alt}
          className={className}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          {...props}
        />
      );
    }
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...props}
      />
    );
  }

  // In production, use Next.js Image component
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      {...props}
    />
  );
}
