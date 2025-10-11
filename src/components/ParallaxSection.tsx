'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollParallax } from '@/animations/useScrollParallax';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  bgImage?: string;
  bgSpeed?: number;
  contentSpeed?: number;
  overlayColor?: string; // For subtle light shifts
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  id,
  className,
  bgImage,
  bgSpeed = 0.2,
  contentSpeed = 0,
  overlayColor,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLElement>(null);

  useScrollParallax({ target: bgRef as React.RefObject<HTMLElement>, speed: bgSpeed * -100, direction: 'y' });
  if (contentSpeed !== 0) {
    useScrollParallax({ target: contentRef as React.RefObject<HTMLElement>, speed: contentSpeed * -100, direction: 'y' });
  }

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;

    if (!section) return;

    // Section transition: subtle light shifts and fade-in
    gsap.fromTo(
      section,
      {
        opacity: 0.8,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Overlay for subtle light shifts
    if (overlay && overlayColor) {
      gsap.fromTo(
        overlay,
        {
          opacity: 0,
        },
        {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [overlayColor]);

  return (
    <section id={id} ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      {overlayColor && (
        <div
          ref={overlayRef as React.RefObject<HTMLDivElement>}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ backgroundColor: overlayColor, opacity: 0 }}
        />
      )}
      <div ref={contentRef} className="relative z-10 w-full h-full flex  flex-col items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
