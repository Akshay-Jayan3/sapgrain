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
              filter: 'blur(10px)',
              y: gsap.utils.random(-50, 50),
              scale: 1.1,
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

  return (
    <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image, index) => (
        <div
          key={image.id}
          ref={el => {
            imageRefs.current[index] = el!;
          }}
          className="relative w-full h-80 overflow-hidden rounded-lg shadow-xl interactive"
        >
          <Image
            src={image.src}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            className="transition-all duration-300 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
            <h3 className="text-white text-xl font-heading">{image.alt}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudioGallery;
