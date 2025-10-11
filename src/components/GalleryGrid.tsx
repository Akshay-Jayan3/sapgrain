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
      scale: 1.05,
      rotate: gsap.utils.random(-2, 2),
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: '0 10px 30px rgba(198,166,100,0.4)',
    });
    // Assume a global cursor change mechanism or direct manipulation for now
    // For a real app, you'd use context or a global state for cursor changes
    document.body.style.setProperty('--cursor-color', '#c6a664');
  };

  const handleUnhover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    });
    document.body.style.setProperty('--cursor-color', '#f2f0e9');
  };

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map(item => (
        <div
          key={item.id}
          className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 interactive"
          onMouseEnter={handleHover}
          onMouseLeave={handleUnhover}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={500}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-text mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">A captivating piece of art.</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
