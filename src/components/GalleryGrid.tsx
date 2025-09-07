'use client';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      Array.from(gridRef.current.children),
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [items]);

  const handleHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.03, // Slightly less aggressive scale
      rotate: gsap.utils.random(-1, 1), // More subtle rotation
      duration: 0.4,
      ease: 'power3.out',
      boxShadow: '0 15px 40px rgba(198,166,100,0.5), 0 0 20px rgba(198,166,100,0.3) inset', // More intense, refined glow
    });
    document.body.style.setProperty('--cursor-color', '#c6a664');
  };

  const handleUnhover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotate: 0,
      duration: 0.4,
      ease: 'power3.out',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    });
    document.body.style.setProperty('--cursor-color', '#f2f0e9');
  };

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map(item => (
        <div
          key={item.id}
          className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 interactive transform transition-all duration-300 ease-out"
          onMouseEnter={handleHover}
          onMouseLeave={handleUnhover}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={500}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" // Less aggressive image scale
          />
          <div className="p-6">
            <h3 className="text-xl font-heading font-semibold text-accent mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400 font-body">A captivating piece of art.</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
