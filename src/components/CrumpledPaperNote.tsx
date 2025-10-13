'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TornPaper from '@/components/TornPaper';

gsap.registerPlugin(ScrollTrigger);

interface CrumpledPaperNoteProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: 'note' | 'process' | 'polaroid';
  tapeColor?: 'blue' | 'kraft' | 'pink' | 'none';
  pin?: boolean;
  stamp?: string;
  coffeeRing?: boolean;
  enterFrom?: 'left' | 'right' | 'bottom' | 'none';
  index?: number;
  children?: React.ReactNode;
}

const tapeClassByColor: Record<string, string> = {
  blue: 'bg-blue-200/80',
  kraft: 'bg-amber-300/80',
  pink: 'bg-pink-200/80',
  none: 'bg-transparent',
};

const CrumpledPaperNote: React.FC<CrumpledPaperNoteProps> = ({
  className = '',
  title,
  text,
  variant = 'note',
  tapeColor = 'kraft',
  pin = true,
  stamp,
  coffeeRing = false,
  enterFrom = 'left',
  index = 0,
  children,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const x = enterFrom === 'left' ? -120 : enterFrom === 'right' ? 120 : 0;
    const y = enterFrom === 'bottom' ? 80 : 0;
    const baseRotate = enterFrom === 'left' ? -4 : enterFrom === 'right' ? 3 : -2;
    gsap.fromTo(
      rootRef.current,
      { x, y, rotate: baseRotate, opacity: 0 },
      {
        x: 0,
        y: 0,
        rotate: baseRotate,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.06,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // micro sway tied to scroll
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(rootRef.current, {
        rotate: baseRotate + 1.2,
        yoyo: true,
        repeat: -1,
        duration: 3.5,
        ease: 'sine.inOut',
      });
    });

    return () => {
      mm.revert();
    };
  }, [enterFrom, index]);

  const tapeCls = tapeClassByColor[tapeColor];

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <TornPaper animateOnMount={false} rotation={-2} scale={1} x={0} y={0} zIndex={1} color="bg-amber-50" className="inset-0 w-full h-full paper-crumple paper-distort paper-shadow-natural">
        <div className="w-full h-full p-3 md:p-4">
          {title && <div className="font-heading text-sm md:text-base text-stone-800 mb-1">{title}</div>}
          {text && <div className="font-body text-stone-700 leading-tight text-xs md:text-sm">{text}</div>}
          {children}
        </div>
      </TornPaper>

      {/* tape corners */}
      {tapeColor !== 'none' && (
        <>
          <div className={`pointer-events-none absolute -top-2 left-6 w-16 h-4 ${tapeCls} rotate-[-8deg] shadow-sm`} />
          <div className={`pointer-events-none absolute -top-1 right-8 w-12 h-3 ${tapeCls} rotate-[10deg] shadow-sm`} />
        </>
      )}

      {/* pin */}
      {pin && (
        <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 z-[4]">
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 rounded-full bg-stone-700 shadow-[0_2px_6px_rgba(0,0,0,0.35)]" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-stone-500/70 to-stone-800/70 mix-blend-overlay" />
          </div>
          <div className="mx-auto mt-1 h-8 w-[2px] bg-stone-900/10" />
        </div>
      )}

      {/* overlays */}
      {coffeeRing && (
        <div className="pointer-events-none absolute bottom-6 left-6 w-16 h-16 border-2 border-amber-900/40 rounded-full rotate-[-7deg]" />
      )}
      {stamp && (
        <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] tracking-wider uppercase text-amber-900/70 border border-amber-900/40 px-2 py-0.5 rotate-[-6deg]">
          {stamp}
        </div>
      )}
    </div>
  );
};

export default CrumpledPaperNote;


