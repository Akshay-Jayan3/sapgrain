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
  const craftTextRef = useRef<HTMLParagraphElement>(null);
  const techTextRef = useRef<HTMLParagraphElement>(null);
  const harmonyTextRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useRevealText({ target: aboutTextRef1 as React.RefObject<HTMLElement>, delay: 0.2 });
  useRevealText({ target: aboutTextRef2 as React.RefObject<HTMLElement>, delay: 0.4 });
  useRevealText({ target: craftTextRef as React.RefObject<HTMLElement>, delay: 0.2 });
  useRevealText({ target: techTextRef as React.RefObject<HTMLElement>, delay: 0.4 });
  useRevealText({ target: harmonyTextRef as React.RefObject<HTMLElement>, delay: 0.6 });

  useEffect(() => {
    // Logo reveal animation
    gsap.fromTo(
      logoRef.current,
      {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power3.out',
        delay: 0.2,
      }
    );

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
    <main className="relative bg-background">
      {/* Hero Section */}
      <ParallaxSection
        id="hero"
        bgImage="/images/wooden-grain.png"
        bgSpeed={0.3}
        className="h-screen flex flex-col items-center justify-center text-center"
        overlayColor="rgba(0,0,0,0.2)"
        contentClassName="p-8"
      >
        <div className="mb-8">
          <h1 ref={logoRef} className="font-heading text-6xl md:text-8xl font-bold text-accent interactive opacity-0 transform-gpu">
            Sapgrain
          </h1>
        </div>

        <SectionHeading level="h2" className="text-5xl md:text-6xl font-body mb-8 text-text-light" delay={0.8}>
          Where Craft Meets Code.
        </SectionHeading>

        <Link
          href="#about"
          className="bg-accent text-background font-bold py-3 px-8 rounded-full text-lg interactive hover:scale-105 transition-transform duration-300 ease-out shadow-lg hover:shadow-xl"
        >
          Explore the Studio
        </Link>
      </ParallaxSection>

      {/* About Section */}
      <ParallaxSection
        id="about"
        className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(10, 5, 0, 0.1)"
        contentClassName="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
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
      </ParallaxSection>

      {/* Creations Section */}
      <ParallaxSection
        id="creations"
        className="min-h-screen py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(0,0,0,0.1)"
        contentClassName="container mx-auto text-center"
      >
        <SectionHeading level="h2" className="text-5xl md:text-6xl font-bold text-accent mb-12">
          Our Creations
        </SectionHeading>
        <GalleryGrid items={creations} />
      </ParallaxSection>

      {/* Philosophy Section */}
      <ParallaxSection
        id="philosophy"
        className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(5, 0, 10, 0.1)"
        contentClassName="container mx-auto text-center"
      >
        <SectionHeading level="h2" className="text-5xl md:text-6xl font-bold text-accent mb-6">
          Our Philosophy
        </SectionHeading>
        <p className="font-body text-lg leading-relaxed max-w-3xl mx-auto text-text mb-12">
          At Sapgrain, we believe in the profound dialogue between the tangible and the digital, the ancient craft and future technology. Our philosophy is rooted in three core pillars:
        </p>
      </ParallaxSection>

      <ParallaxSection
        id="philosophy-craft"
        className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-background-darker"
        bgImage="/images/craft-bg.png"
        bgSpeed={0.2}
        overlayColor="rgba(10, 0, 0, 0.2)"
        contentClassName="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="text-text md:text-right">
          <SectionHeading level="h3" className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Craft
          </SectionHeading>
          <p ref={craftTextRef} className="font-body text-lg leading-relaxed">
            The soul of Sapgrain lies in the art of creation by hand. We honor the legacy of artisans, embracing traditional techniques to imbue every piece with authenticity and a timeless spirit. This dedication to craft ensures that even our digital manifestations carry the warmth and imperfection of human touch.
          </p>
        </div>
        <div className="h-80 w-full bg-gray-700 rounded-lg shadow-xl relative overflow-hidden">
           <Image src="/images/craft-visual.png" alt="Craft Visual" layout="fill" objectFit="cover" className="absolute inset-0 parallax-element" />
        </div>
      </ParallaxSection>

      <ParallaxSection
        id="philosophy-technology"
        className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-background-dark"
        bgImage="/images/tech-bg.png"
        bgSpeed={0.1}
        overlayColor="rgba(0, 0, 10, 0.2)"
        contentClassName="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="h-80 w-full bg-gray-700 rounded-lg shadow-xl relative overflow-hidden">
            <Image src="/images/tech-visual.png" alt="Technology Visual" layout="fill" objectFit="cover" className="absolute inset-0 parallax-element" />
        </div>
        <div className="text-text">
          <SectionHeading level="h3" className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Technology
          </SectionHeading>
          <p ref={techTextRef} className="font-body text-lg leading-relaxed">
            Beyond tradition, we explore the frontiers of digital innovation. Technology serves as our canvas, allowing us to extend the boundaries of perception and interaction. From immersive web experiences to interactive installations, we harness code to amplify the essence of craft, making it accessible and engaging in new dimensions.
          </p>
        </div>
      </ParallaxSection>

      <ParallaxSection
        id="philosophy-harmony"
        className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-background-darker"
        bgImage="/images/harmony-bg.png"
        bgSpeed={0.3}
        overlayColor="rgba(10, 10, 0, 0.2)"
        contentClassName="container mx-auto text-center"
      >
        <SectionHeading level="h3" className="text-4xl md:text-5xl font-bold text-accent mb-4">
          Harmony
        </SectionHeading>
        <p ref={harmonyTextRef} className="font-body text-lg leading-relaxed max-w-3xl mx-auto text-text">
          Our ultimate pursuit is harmony – the seamless integration of art and science, human ingenuity and digital precision. Sapgrain stands as a testament to this balance, where every pixel is imbued with purpose, and every interaction resonates with the spirit of craftsmanship. We invite you to experience this synthesis, where the past and future converge in a beautiful, living present.
        </p>
      </ParallaxSection>

      {/* Studio Section */}
      <ParallaxSection
        id="studio"
        className="min-h-screen py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(0,5,0,0.1)"
        contentClassName="container mx-auto text-center"
      >
        <SectionHeading level="h2" className="text-5xl md:text-6xl font-bold text-accent mb-12">
          Our Studio & Workshop
        </SectionHeading>
        <p className="font-body text-lg leading-relaxed max-w-3xl mx-auto text-text mb-12">
          Step behind the scenes and witness where ideas take form, where raw materials are imbued with life, and where digital dreams are meticulously woven. Our studio is a vibrant space where traditional craft meets cutting-edge technology.
        </p>
        <StudioGallery images={studioImages} />
      </ParallaxSection>

      {/* Contact Section */}
      <ParallaxSection
        id="contact"
        className="min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(10, 10, 5, 0.1)"
        contentClassName="container mx-auto text-center max-w-2xl"
      >
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
      </ParallaxSection>

      {/* Journal Section */}
      <ParallaxSection
        id="journal"
        className="min-h-screen py-20 px-4 md:px-8 bg-background-dark"
        overlayColor="rgba(0,0,0,0.1)"
        contentClassName="container mx-auto text-center"
      >
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
      </ParallaxSection>
    </main>
  );
};

export default Home;
