'use client';
import React, { useRef } from 'react';
import { useRevealText } from '@/animations/useRevealText';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  delay?: number;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  className = '',
  level = 'h2',
  delay = 0,
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useRevealText({ target: headingRef as React.RefObject<HTMLElement>, delay });

  const HeadingTag = level;

  return (
    <HeadingTag
      ref={headingRef}
      className={`font-heading text-text ${className}`}
    >
      {children}
    </HeadingTag>
  );
};

export default SectionHeading;
