'use client';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StudioImage {
  id: number;
  src: string;
  alt: string;
}

interface StudioGalleryProps {
  images: StudioImage[];
}

const StudioGallery: React.FC<StudioGalleryProps> = ({ images }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!galleryRef.current) return;

    imageRefs.current.forEach((imageWrapper, index) => {
      if (imageWrapper) {
        const image = imageWrapper.querySelector('img');
        if (image) {
          gsap.fromTo(
            imageWrapper,
            {
              opacity: 0,
              y: 100,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: imageWrapper,
                start: 'top bottom-=150',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Subtle motion blur and depth illusion on scroll
          gsap.to(image,
            {
              filter: 'blur(4px)', // More subtle blur for premium feel
              y: gsap.utils.random(-30, 30), // Smaller y range for subtlety
              scale: 1.05, // Slightly less aggressive scale
              ease: 'none',
              scrollTrigger: {
                trigger: imageWrapper,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      }
    });
  }, [images]);

  const handleHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.02, // Subtle scale on hover
      boxShadow: '0 15px 40px rgba(198,166,100,0.5), 0 0 20px rgba(198,166,100,0.3) inset', // Enhanced glow
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleUnhover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  return (
    <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image, index) => (
        <div
          key={image.id}
          ref={el => {
            imageRefs.current[index] = el!;
          }}
          className="relative w-full h-80 overflow-hidden rounded-lg shadow-xl interactive transform transition-all duration-300 ease-out"
          onMouseEnter={handleHover}
          onMouseLeave={handleUnhover}
        >
          <Image
            src={image.src}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            className="transition-all duration-300 ease-out group-hover:scale-105" // Subtle image scale on hover
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
            <h3 className="text-white text-xl font-heading font-semibold">{image.alt}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudioGallery;
