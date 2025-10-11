'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

const NotFound: React.FC = () => {
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particleContainerRef.current) return;

    const container = particleContainerRef.current;
    const numParticles = 30;

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute bg-accent rounded-full opacity-0 pointer-events-none';
      container.appendChild(particle);

      const size = gsap.utils.random(2, 8);
      const x = gsap.utils.random(0, window.innerWidth);
      const duration = gsap.utils.random(6, 15);
      const delay = gsap.utils.random(0, 5);

      gsap.set(particle, {
        width: size,
        height: size,
        x: x,
        y: window.innerHeight,
        opacity: 0,
      });

      gsap.to(particle, {
        y: -50, // Floating upwards slightly off screen
        opacity: gsap.utils.random(0.2, 0.6),
        duration: duration,
        ease: 'none',
        delay: delay,
        repeat: -1,
        yoyo: true, // Float up and down
        modifiers: {
          y: (y: string) => {
            const parsedY = parseFloat(y);
            if (parsedY < -40) {
              // Reset particle to bottom when it goes off screen
              gsap.set(particle, { y: window.innerHeight + 20, x: gsap.utils.random(0, window.innerWidth), opacity: 0 });
              return window.innerHeight + 20; // Return new y position for immediate reset
            }
            return y;
          },
        },
      });
    }

    return () => {
      // Cleanup GSAP animations and remove particles
      gsap.killTweensOf(container.children);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-background text-text overflow-hidden">
      <div ref={particleContainerRef} className="absolute inset-0 z-0"></div>
      <div className="relative z-10 text-center">
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-accent mb-4">
          404
        </h1>
        <p className="font-body text-xl md:text-2xl mb-8">
          Seems like this grain hasn't been carved yet.
        </p>
        <Link href="/" className="bg-accent text-background font-bold py-3 px-8 rounded-full text-lg interactive hover:scale-105 transition-transform duration-300 ease-out shadow-lg hover:shadow-xl">
          Back to Workshop
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
