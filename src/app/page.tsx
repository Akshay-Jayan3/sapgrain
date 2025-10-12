'use client';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParallaxSection from '@/components/ParallaxSection';
import SectionHeading from '@/components/SectionHeading';
import Image from 'next/image';
import { useRevealText } from '@/animations/useRevealText';
import GalleryGrid from '@/components/GalleryGrid';
import StudioGallery from '@/components/StudioGallery';
import JournalCard from '@/components/JournalCard';
import TornPaperHero from '@/components/TornPaperHero';

gsap.registerPlugin(ScrollTrigger);

const creations = [
  { id: 1, src: '/images/creation1.png', alt: 'Abstract Painting', title: 'Abstract Painting' },
  { id: 2, src: '/images/creation2.png', alt: 'Hand-carved Wood Sculpture', title: 'Wood Sculpture' },
  { id: 3, src: '/images/creation3.png', alt: 'Digital Art Piece', title: 'Digital Art' },
  { id: 4, src: '/images/creation4.png', alt: 'Ceramic Vase', title: 'Ceramic Vase' },
];

const studioImages = [
  { id: 1, src: '/images/studio1.png', alt: 'Workbench with tools' },
  { id: 2, src: '/images/studio2.png', alt: 'Materials and textures' },
  { id: 3, src: '/images/studio3.png', alt: 'Artist at work' },
  { id: 4, src: '/images/studio4.png', alt: 'Finished piece in studio' },
];

const journalEntries = [
  {
    id: 1,
    title: 'The Art of Patina: A Woodworker\'s Tale',
    excerpt: 'Exploring the beauty of aged wood and the stories it tells through time.',
    imageUrl: '/images/journal1.jpg',
    slug: 'the-art-of-patina',
  },
  {
    id: 2,
    title: 'Digital Alchemy: Weaving Code into Craft',
    excerpt: 'How we blend traditional techniques with modern web development to create immersive experiences.',
    imageUrl: '/images/journal2.jpg',
    slug: 'digital-alchemy',
  },
  {
    id: 3,
    title: 'The Philosophy of Imperfection',
    excerpt: 'Embracing the unique character of handmade objects in a digital world.',
    imageUrl: '/images/journal3.jpg',
    slug: 'philosophy-of-imperfection',
  },
  {
    id: 4,
    title: 'Behind the Scenes: A Day in the Sapgrain Studio',
    excerpt: 'A glimpse into our creative process, from initial sketch to final polish.',
    imageUrl: '/images/journal4.jpg',
    slug: 'behind-the-scenes',
  },
];

const Home: React.FC = () => {
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const aboutTextRef1 = useRef<HTMLParagraphElement>(null);
  const aboutTextRef2 = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useRevealText({ target: aboutTextRef1 as React.RefObject<HTMLElement>, delay: 0.2 });
  useRevealText({ target: aboutTextRef2 as React.RefObject<HTMLElement>, delay: 0.4 });

  useEffect(() => {
    // Initial animation for tagline and CTA
    gsap.fromTo(
      taglineRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5,
      }
    );

    gsap.fromTo(
      ctaRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1,
      }
    );

    // Contact form reveal
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.5,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <main className="relative bg-black">
      {/* Hero Section */}
      <TornPaperHero />

      {/* About Section */}
      <ParallaxSection
        id="about"
        className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(10, 5, 0, 0.1)"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-text space-y-6">
            <SectionHeading level="h2" className="text-5xl md:text-6xl font-bold text-accent mb-6">
              Our Journey
            </SectionHeading>
            <p ref={aboutTextRef1} className="font-body text-lg leading-relaxed">
              Sapgrain began as a humble workshop, a sanctuary where raw materials were transformed into objects of beauty and purpose. Our hands, guided by a passion for traditional craftsmanship, meticulously shaped wood, clay, and pigment, breathing life into each creation.
            </p>
            <p ref={aboutTextRef2} className="font-body text-lg leading-relaxed">
              Over time, we realized the immense potential of merging our handcrafted ethos with the boundless possibilities of the digital realm. This journey from workshop to web has allowed us to share our philosophy and creations with a wider audience, inviting you into an immersive experience where the tactile meets the technological.
            </p>
          </div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/artist-workspace.png"
              alt="Artist Workspace"
              layout="fill"
              objectFit="cover"
              className="parallax-element"
            />
          </div>
        </div>
      </ParallaxSection>

      {/* Creations Section */}
      <ParallaxSection
        id="creations"
        className="min-h-screen py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(0,0,0,0.1)"
      >
        <div className="container mx-auto text-center">
          <SectionHeading level="h2" className="text-5xl md:text-6xl font-bold text-accent mb-12">
            Our Creations
          </SectionHeading>
          <GalleryGrid items={creations} />
        </div>
      </ParallaxSection>

      {/* Studio Section */}
      <ParallaxSection
        id="studio"
        className="min-h-screen py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(0,5,0,0.1)"
      >
        <div className="container mx-auto text-center">
          <SectionHeading level="h2" className="text-5xl md:text-6xl font-bold text-accent mb-12">
            Our Studio & Workshop
          </SectionHeading>
          <p className="font-body text-lg leading-relaxed max-w-3xl mx-auto text-text mb-12">
            Step behind the scenes and witness where ideas take form, where raw materials are imbued with life, and where digital dreams are meticulously woven. Our studio is a vibrant space where traditional craft meets cutting-edge technology.
          </p>
          <StudioGallery images={studioImages} />
        </div>
      </ParallaxSection>

      {/* Contact Section */}
      <ParallaxSection
        id="contact"
        className="min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(10, 10, 5, 0.1)"
      >
        <div className="container mx-auto text-center max-w-2xl">
          <SectionHeading level="h2" className="text-5xl md:text-6xl font-bold text-accent mb-6">
            Let's Create Something Timeless.
          </SectionHeading>
          <p className="font-body text-lg leading-relaxed text-text mb-12">
            Have a project in mind, a collaboration idea, or just want to say hello? Reach out to us. We'd love to hear from you.
          </p>

          <form ref={formRef} className="space-y-6 text-left opacity-0">
            <div>
              <label htmlFor="name" className="block text-text text-sm font-body mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 bg-gray-800 text-text rounded-md border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 interactive"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-text text-sm font-body mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 bg-gray-800 text-text rounded-md border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 interactive"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-text text-sm font-body mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full p-3 bg-gray-800 text-text rounded-md border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 interactive"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-background font-bold py-3 px-8 rounded-md text-lg interactive hover:scale-105 transition-transform duration-300 ease-out shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </ParallaxSection>

      {/* Journal Section */}
      <ParallaxSection
        id="journal"
        className="min-h-screen py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(0,0,0,0.1)"
      >
        <div className="container mx-auto text-center">
          <SectionHeading level="h2" className="text-5xl md:text-6xl font-bold text-accent mb-12">
            Journal & Stories
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journalEntries.map((entry, index) => (
              <JournalCard
                key={entry.id}
                title={entry.title}
                excerpt={entry.excerpt}
                imageUrl={entry.imageUrl}
                slug={entry.slug}
                delay={index * 0.15}
              />
            ))}
          </div>
        </div>
      </ParallaxSection>
    </main>
  );
};

export default Home;
