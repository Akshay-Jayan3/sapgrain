'use client';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

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
}

const TornPaper: React.FC<TornPaperProps> = ({
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
}) => {
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paperRef.current) {
      gsap.fromTo(paperRef.current, 
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
  }, [delay, duration, rotation, scale, x, y]);

  return (
    <div
      ref={paperRef}
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
        {/* Add torn edge details with more variation */}
        <path
          d="M0,50 Q5,35 10,20 Q15,15 20,25 Q25,20 30,30 Q35,25 40,35 Q45,30 50,40 Q55,35 60,45 Q65,40 70,50 Q75,45 80,55 Q85,50 90,60 Q95,55 100,65 Q105,60 110,70 Q115,65 120,75 Q125,70 130,80 Q135,75 140,85 Q145,80 150,90 Q155,85 160,95 Q165,90 170,100 Q175,95 180,105 Q185,100 190,110 Q195,105 200,115 L200,50"
          fill="none"
          stroke="rgba(139, 69, 19, 0.3)"
          strokeWidth="0.5"
        />
        {/* Additional torn edge variations */}
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
};

const TornPaperHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Stop-motion style animation for title
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.5,
          ease: 'power3.out',
          onUpdate: function() {
            // Add slight jitter for stop-motion effect
            const progress = this.progress();
            if (progress < 0.8) {
              gsap.set(titleRef.current, { 
                rotation: Math.sin(progress * 20) * 0.5 
              });
            }
          }
        }
      );
    }

    // Staggered animation for subtitle
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 1.2,
          ease: 'back.out(1.7)'
        }
      );
    }

    // CTA button animation
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0, rotation: -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: 1.8,
          ease: 'elastic.out(1, 0.3)'
        }
      );
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
      style={{
        backgroundImage: 'url(/images/wood-grain.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background paper layers */}
      <TornPaper
        delay={0}
        duration={1.5}
        rotation={-5}
        scale={1.1}
        x={-50}
        y={-30}
        zIndex={1}
        color="bg-amber-100"
        className="w-96 h-80 top-10 left-10"
      />
      
      <TornPaper
        delay={0.3}
        duration={1.2}
        rotation={8}
        scale={0.9}
        x={100}
        y={50}
        zIndex={2}
        color="bg-orange-100"
        className="w-80 h-72 top-20 right-20"
      />

      <TornPaper
        delay={0.6}
        duration={1}
        rotation={-12}
        scale={0.8}
        x={-20}
        y={200}
        zIndex={3}
        color="bg-yellow-100"
        className="w-64 h-60 bottom-20 left-20"
      />

      <TornPaper
        delay={0.9}
        duration={1.3}
        rotation={15}
        scale={1.05}
        x={30}
        y={-50}
        zIndex={4}
        color="bg-amber-200"
        className="w-72 h-64 top-32 left-1/2"
      />

      {/* Main content paper */}
      <TornPaper
        delay={1.2}
        duration={1.5}
        rotation={-2}
        scale={1}
        x={0}
        y={0}
        zIndex={10}
        color="bg-white"
        className="w-full max-w-4xl h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="text-center p-8">
          <h1 
            ref={titleRef}
            className="font-heading text-6xl md:text-8xl font-bold text-gray-800 mb-4 opacity-0 stop-motion"
            style={{
              transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
            }}
          >
            Sapgrain
          </h1>
          
          <h2 
            ref={subtitleRef}
            className="text-3xl md:text-5xl font-body text-gray-700 mb-8 opacity-0 stop-motion"
            style={{
              transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
            }}
          >
            Where Craft Meets Code
          </h2>
          
          <Link
            ref={ctaRef}
            href="#about"
            className="inline-block bg-amber-600 text-white font-bold py-4 px-8 rounded-full text-xl hover:bg-amber-700 transition-colors duration-300 shadow-lg hover:shadow-xl opacity-0 stop-motion"
            style={{
              transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            }}
          >
            Explore the Studio
          </Link>
        </div>
      </TornPaper>

      {/* Additional decorative paper pieces */}
      <TornPaper
        delay={1.5}
        duration={1}
        rotation={25}
        scale={0.6}
        x={-100}
        y={-100}
        zIndex={5}
        color="bg-orange-200"
        className="w-48 h-40 top-10 right-10"
      />

      <TornPaper
        delay={1.8}
        duration={1.1}
        rotation={-20}
        scale={0.7}
        x={80}
        y={150}
        zIndex={6}
        color="bg-yellow-200"
        className="w-56 h-44 bottom-10 left-10"
      />

      {/* Sketch-like paper with content */}
      <TornPaper
        delay={2.1}
        duration={1.2}
        rotation={12}
        scale={0.5}
        x={-150}
        y={50}
        zIndex={7}
        color="bg-gray-100"
        className="w-40 h-32 top-1/3 left-5"
        style={{
          transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
        }}
      >
        <div className="text-xs text-gray-600 p-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full mb-2"></div>
          <div className="w-8 h-1 bg-gray-400 mb-1"></div>
          <div className="w-6 h-1 bg-gray-400"></div>
        </div>
      </TornPaper>

      {/* Additional floating paper pieces */}
      <TornPaper
        delay={2.4}
        duration={1}
        rotation={-15}
        scale={0.4}
        x={200}
        y={-80}
        zIndex={8}
        color="bg-orange-300"
        className="w-32 h-24 top-1/4 right-5"
        style={{
          transform: `translate(${mousePosition.x * -6}px, ${mousePosition.y * -6}px)`,
        }}
      />

      <TornPaper
        delay={2.7}
        duration={1.1}
        rotation={30}
        scale={0.3}
        x={-80}
        y={-120}
        zIndex={9}
        color="bg-yellow-300"
        className="w-28 h-20 top-16 left-1/4"
        style={{
          transform: `translate(${mousePosition.x * 4}px, ${mousePosition.y * 4}px)`,
        }}
      />

      {/* Paper with handwritten notes */}
      <TornPaper
        delay={3.0}
        duration={1.3}
        rotation={-8}
        scale={0.6}
        x={120}
        y={120}
        zIndex={5}
        color="bg-amber-300"
        className="w-36 h-28 bottom-32 right-32"
        style={{
          transform: `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`,
        }}
      >
        <div className="text-xs text-amber-800 p-2 font-handwriting">
          <div className="mb-1">craft + code</div>
          <div className="mb-1">handmade</div>
          <div className="text-amber-600">digital</div>
        </div>
      </TornPaper>
    </div>
  );
};

export default TornPaperHero;
