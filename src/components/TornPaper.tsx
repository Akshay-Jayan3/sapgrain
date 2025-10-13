'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface TornPaperProps {
  className?: string;
  delay?: number;
  duration?: number;
  rotation?: number;
  scale?: number;
  x?: number;
  y?: number;
  zIndex?: number;
  color?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  animateOnMount?: boolean;
}

const TornPaper = React.forwardRef<HTMLDivElement, TornPaperProps>(({
  className = '',
  delay = 0,
  duration = 0.8,
  rotation = 0,
  scale = 1,
  x = 0,
  y = 0,
  zIndex = 1,
  color = 'bg-amber-50',
  children,
  style,
  animateOnMount = true,
}, ref) => {
  const paperRef = useRef<HTMLDivElement>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    paperRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  useEffect(() => {
    if (!animateOnMount) return;
    if (paperRef.current) {
      gsap.fromTo(
        paperRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: rotation + 45,
          x: x + 100,
          y: y + 100,
        },
        {
          opacity: 1,
          scale: scale,
          rotation: rotation,
          x: x,
          y: y,
          duration: duration,
          delay: delay,
          ease: 'back.out(1.7)',
        }
      );
    }
  }, [animateOnMount, delay, duration, rotation, scale, x, y]);

  return (
    <div
      ref={setRefs}
      className={`absolute ${color} paper-shadow paper-texture ${className}`}
      style={{ zIndex, ...style }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        className="w-full h-full"
      >
        <defs>
          <filter id="paperTexture">
            <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0.1 0.2 0.1 0.3 0.1" />
            </feComponentTransfer>
          </filter>
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>
        <path
          d="M10,20 Q30,10 50,25 Q70,15 90,30 Q110,20 130,35 Q150,25 170,40 Q190,30 200,50 L200,180 Q180,190 160,180 Q140,190 120,175 Q100,185 80,170 Q60,180 40,170 Q20,180 0,175 L0,50 Q5,35 10,20 Z"
          fill="currentColor"
          filter="url(#paperTexture) url(#dropShadow)"
          className="text-amber-50"
        />
        {/* Torn edge details */}
        <path
          d="M0,50 Q5,35 10,20 Q15,15 20,25 Q25,20 30,30 Q35,25 40,35 Q45,30 50,40 Q55,35 60,45 Q65,40 70,50 Q75,45 80,55 Q85,50 90,60 Q95,55 100,65 Q105,60 110,70 Q115,65 120,75 Q125,70 130,80 Q135,75 140,85 Q145,80 150,90 Q155,85 160,95 Q165,90 170,100 Q175,95 180,105 Q185,100 190,110 Q195,105 200,115 L200,50"
          fill="none"
          stroke="rgba(139, 69, 19, 0.3)"
          strokeWidth="0.5"
        />
        <path
          d="M0,50 Q8,45 15,50 Q22,45 30,50 Q38,45 45,50 Q52,45 60,50 Q68,45 75,50 Q82,45 90,50 Q98,45 105,50 Q112,45 120,50 Q128,45 135,50 Q142,45 150,50 Q158,45 165,50 Q172,45 180,50 Q188,45 195,50 Q200,45 200,50"
          fill="none"
          stroke="rgba(160, 82, 45, 0.2)"
          strokeWidth="0.3"
        />
        {/* Paper fiber texture */}
        <path
          d="M20,30 Q40,25 60,35 Q80,30 100,40 Q120,35 140,45 Q160,40 180,50"
          fill="none"
          stroke="rgba(210, 180, 140, 0.4)"
          strokeWidth="0.2"
        />
        <path
          d="M25,60 Q45,55 65,65 Q85,60 105,70 Q125,65 145,75 Q165,70 185,80"
          fill="none"
          stroke="rgba(210, 180, 140, 0.3)"
          strokeWidth="0.15"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {children}
        </div>
      )}
    </div>
  );
});

export default TornPaper;


