'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TornPaper from '@/components/TornPaper';

gsap.registerPlugin(ScrollTrigger);

interface FramedCreationProps {
  src: string;
  alt: string;
  title?: string;
  index?: number;
  className?: string;
  displayMode?: 'framed' | 'paper';
}

const FramedCreation: React.FC<FramedCreationProps> = ({ src, alt, title, index = 0, className = '', displayMode = 'framed' }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const rotationSeed = (index % 4) - 1.5; // -1.5..1.5
    gsap.fromTo(
      rootRef.current,
      { y: 60, rotate: rotationSeed * 3, opacity: 0 },
      {
        y: 0,
        rotate: rotationSeed,
        opacity: 1,
        duration: 1.05,
        ease: 'power3.out',
        delay: index * 0.06,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div ref={rootRef} className={`aspect-[4/5] ${className}`}>
      {displayMode === 'framed' && (
        <div className="absolute inset-3 md:inset-4 bg-white shadow-2xl border-8 border-stone-200 z-[2]">
          <div className="relative w-full h-full border border-stone-300 overflow-hidden">
            <Image src={src} alt={alt} fill className="object-cover" />
          </div>
        </div>
      )}

      {/* Tape corners */}
      <div className="pointer-events-none absolute top-2 left-6 w-14 h-4 bg-amber-200/80 rotate-[-10deg] shadow-sm z-[3]" />
      <div className="pointer-events-none absolute top-2 right-8 w-16 h-3 bg-yellow-200/80 rotate-[12deg] shadow-sm z-[3]" />
      <div className="pointer-events-none absolute bottom-2 -left-1 w-12 h-3 bg-orange-200/80 rotate-[-5deg] shadow-sm z-[3]" />
      <div className="pointer-events-none absolute bottom-4 right-3 w-20 h-4 bg-amber-300/80 rotate-[6deg] shadow-sm z-[3]" />

      {/* Nail pin at top center for "pinned to wall" feel */}
      {/* <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-[4]">
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 rounded-full bg-stone-700 shadow-[0_2px_6px_rgba(0,0,0,0.35)]" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-stone-500/70 to-stone-800/70 mix-blend-overlay" />
        </div>
        <div className="mx-auto mt-1 h-8 w-[2px] bg-stone-900/10" />
      </div> */}

      {title && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-600 text-stone-100 text-sm px-3 py-1 rounded shadow-md">
          {title}
        </div>
      )}
    </div>
  );
};

export default FramedCreation;


