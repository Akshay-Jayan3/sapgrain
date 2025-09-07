'use client';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

interface JournalCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
  delay?: number;
}

const JournalCard: React.FC<JournalCardProps> = ({
  title,
  excerpt,
  imageUrl,
  slug,
  delay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: delay,
      }
    );
  }, [delay]);

  const handleHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: -8, // Subtle lift
      boxShadow: '0 15px 40px rgba(198,166,100,0.5), 0 0 20px rgba(198,166,100,0.3) inset', // Enhanced glow
      scale: 1.01, // Very subtle scale
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleUnhover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      scale: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  return (
    <Link href={`/journal/${slug}`} passHref>
      <div
        ref={cardRef}
        className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full interactive transform transition-all duration-300 ease-out"
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
        role="link"
        tabIndex={0}
      >
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={250}
          objectFit="cover"
          className="w-full h-48 transition-transform duration-300 group-hover:scale-105" // Subtle image scale on hover
        />
        <div className="p-6">
          <h3 className="font-heading text-2xl font-semibold text-accent mb-2">{title}</h3>
          <p className="font-body text-gray-400 text-sm">{excerpt}</p>
        </div>
      </div>
    </Link>
  );
}

export default JournalCard;
