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
import TornPaper from '@/components/TornPaper';
import FramedCreation from '@/components/FramedCreation';
import CrumpledPaperNote from '@/components/CrumpledPaperNote';

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
  const aboutSectionRef = useRef<HTMLElement>(null);
  // We will target About papers via class selectors instead of React refs
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

  useEffect(() => {
    // Scroll-triggered animations for About papers and text
    if (!aboutSectionRef.current) return;
    const ctx = gsap.context(() => {
      const leftPapers = gsap.utils.toArray<HTMLElement>('.about-paper-left');
      leftPapers.forEach((el) => {
        gsap.fromTo(
          el,
          { x: -120, y: -30, rotate: -6, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotate: -6,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      const rightPapers = gsap.utils.toArray<HTMLElement>('.about-paper-right');
      rightPapers.forEach((el) => {
        gsap.fromTo(
          el,
          { x: 120, y: 30, rotate: 9, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotate: 9,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      const mainPapers = gsap.utils.toArray<HTMLElement>('.about-paper-main');
      mainPapers.forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.95, y: 80, rotate: -3, opacity: 0 },
          {
            scale: 1,
            y: 0,
            rotate: -3,
            opacity: 1,
            duration: 1.2,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      if (aboutTextRef1.current) {
        gsap.fromTo(
          aboutTextRef1.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (aboutTextRef2.current) {
        gsap.fromTo(
          aboutTextRef2.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.25,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, aboutSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative">
      {/* Hero Section */}
      <TornPaperHero />

      {/* About Section (Torn Paper layout) */}
      <section id="about" ref={aboutSectionRef} className="relative min-h-screen w-full overflow-hidden bg-background-dark py-24">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/wood-grain.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05 }} />

        {/* Background torn paper layers */}
        <div className="container mx-auto relative">
          <div className="relative h-[700px] md:h-[600px]">
            <TornPaper animateOnMount={false} rotation={-6} scale={1.05} x={0} y={0} zIndex={1} color="bg-amber-100" className="about-paper-left w-72 h-64 top-8 left-6" />
            <TornPaper animateOnMount={false} rotation={9} scale={0.9} x={0} y={0} zIndex={2} color="bg-orange-100" className="about-paper-right w-64 h-56 top-20 right-10" />
            <TornPaper animateOnMount={false} rotation={12} scale={0.7} x={0} y={0} zIndex={3} color="bg-yellow-100" className="about-paper-left w-52 h-44 bottom-10 left-12" />

            {/* Main content paper */}
            <TornPaper animateOnMount={false} rotation={-3} scale={1} x={0} y={0} zIndex={10} color="bg-white" className="about-paper-main w-full max-w-5xl h-auto min-h-[420px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 items-stretch w-full h-full">
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <SectionHeading level="h2" className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Our Journey
                  </SectionHeading>
                  <p ref={aboutTextRef1} className="font-body text-base md:text-lg leading-relaxed text-gray-700 mb-4 opacity-0">
                    Sapgrain began as a humble workshop, a sanctuary where raw materials were transformed into objects of beauty and purpose. Our hands, guided by a passion for traditional craftsmanship, meticulously shaped wood, clay, and pigment, breathing life into each creation.
                  </p>
                  <p ref={aboutTextRef2} className="font-body text-base md:text-lg leading-relaxed text-gray-700 opacity-0">
                    Over time, we realized the immense potential of merging our handcrafted ethos with the boundless possibilities of the digital realm. This journey from workshop to web has allowed us to share our philosophy and creations with a wider audience, inviting you into an immersive experience where the tactile meets the technological.
                  </p>
                </div>
                <div className="relative min-h-[260px] md:min-h-[420px] w-full">
                  <div className="absolute inset-3 md:inset-6 rounded-md overflow-hidden shadow-xl">
                    <Image src="/images/artist-workspace.png" alt="Artist Workspace" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </TornPaper>

            {/* Foreground decorative papers */}
            <TornPaper animateOnMount={false} rotation={18} scale={0.5} x={0} y={0} zIndex={11} color="bg-orange-200" className="about-paper-right w-40 h-32 top-10 right-8" />
            <TornPaper animateOnMount={false} rotation={-15} scale={0.4} x={0} y={0} zIndex={12} color="bg-yellow-200" className="about-paper-left w-36 h-28 bottom-8 left-10" />
          </div>
        </div>
      </section>

      {/* Creations Section */}
      <section id="creations" className="relative py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/wood-grain.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div className="container mx-auto relative">
          <SectionHeading level="h2" className="text-5xl md:text-6xl font-bold text-amber-600 mb-12 text-center">
            Our Creations
          </SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {creations.map((item, index) => {
              const isPaper = index % 3 === 1; // mix modes
              const sizeClass = index % 4 === 0 ? 'sm:col-span-1 lg:col-span-1 lg:row-span-1' : index % 4 === 1 ? 'sm:col-span-1 lg:col-span-1' : index % 4 === 2 ? 'sm:col-span-1' : 'sm:col-span-1';
              const offsetClass = index % 6 === 0 ? 'translate-y-2' : index % 6 === 3 ? '-translate-y-4' : '';
              return (
                <FramedCreation
                  key={item.id}
                  src={item.src}
                  alt={item.alt}
                  title={item.title}
                  index={index}
                  displayMode={isPaper ? 'paper' : 'framed'}
                  className={`${sizeClass} ${offsetClass}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section id="studio" className="relative py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/wood-grain.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div className="container mx-auto relative">
          <SectionHeading level="h2" className="text-5xl md:text-6xl font-bold text-amber-600 mb-12 text-center">
            Studio Notes
          </SectionHeading>

          {/* Vision Board - Wood Investigation Style */}
          <div className="relative rounded-lg p-8 md:p-12 mb-16 shadow-2xl min-h-[800px] md:min-h-[900px]" style={{
            backgroundImage: 'url(/images/wood-grain.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            {/* Wood grain overlay for depth */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-800/20 to-amber-900/30" />

            {/* Investigation strings - more visible web */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                {/* Central hub connections - more visible */}
                <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="#8B4513" strokeWidth="3" strokeDasharray="4,2" opacity="0.9" />
                <line x1="50%" y1="50%" x2="75%" y2="30%" stroke="#8B4513" strokeWidth="3" strokeDasharray="4,2" opacity="0.9" />
                <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="#8B4513" strokeWidth="3" strokeDasharray="4,2" opacity="0.9" />
                <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="#8B4513" strokeWidth="3" strokeDasharray="4,2" opacity="0.9" />

                {/* Secondary connections */}
                <line x1="25%" y1="30%" x2="15%" y2="20%" stroke="#8B4513" strokeWidth="2" strokeDasharray="3,2" opacity="0.8" />
                <line x1="75%" y1="30%" x2="85%" y2="20%" stroke="#8B4513" strokeWidth="2" strokeDasharray="3,2" opacity="0.8" />
                <line x1="20%" y1="70%" x2="10%" y2="80%" stroke="#8B4513" strokeWidth="2" strokeDasharray="3,2" opacity="0.8" />
                <line x1="80%" y1="70%" x2="90%" y2="80%" stroke="#8B4513" strokeWidth="2" strokeDasharray="3,2" opacity="0.8" />

                {/* Cross connections */}
                <line x1="25%" y1="30%" x2="75%" y2="30%" stroke="#8B4513" strokeWidth="1.5" strokeDasharray="2,3" opacity="0.7" />
                <line x1="20%" y1="70%" x2="80%" y2="70%" stroke="#8B4513" strokeWidth="1.5" strokeDasharray="2,3" opacity="0.7" />
                <line x1="25%" y1="30%" x2="20%" y2="70%" stroke="#8B4513" strokeWidth="1" strokeDasharray="1,2" opacity="0.6" />
                <line x1="75%" y1="30%" x2="80%" y2="70%" stroke="#8B4513" strokeWidth="1" strokeDasharray="1,2" opacity="0.6" />
              </svg>
            </div>

            {/* Central Product Photo - Large and Prominent */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <img src="/images/creation1.png" alt="Featured Creation" className="w-48 h-48 object-cover rounded-lg shadow-2xl border-4 border-white" />
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="absolute -bottom-3 -left-3 bg-yellow-200 px-4 py-2 rounded shadow-lg transform -rotate-3">
                  <span className="font-handwriting text-xl text-amber-800 font-bold">FEATURED</span>
                </div>
                {/* Additional labels around the central product */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded shadow-md">
                  <span className="font-handwriting text-sm text-stone-700 font-bold">MAIN CREATION</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded shadow-md">
                  <span className="font-handwriting text-sm text-stone-700 font-bold">SHOWCASE</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 relative" style={{ zIndex: 2 }}>
              {/* Top Left - Tools */}
              <div className="md:col-span-1 lg:col-span-1">
                <div className="space-y-4">
                  <div className="relative">
                    <img src="/images/studio1.png" alt="Workshop tools" className="w-full h-32 object-cover rounded shadow-lg" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
                    <div className="absolute -bottom-2 -left-2 bg-yellow-200 px-2 py-1 rounded shadow-md transform -rotate-2">
                      <span className="font-handwriting text-sm text-amber-800 font-bold">TOOLS</span>
                    </div>
                  </div>
                  <div className="relative">
                    <img src="/images/studio2.png" alt="Materials" className="w-full h-24 object-cover rounded shadow-lg" />
                    <div className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                    <div className="absolute -bottom-1 -right-1 bg-pink-200 px-2 py-1 rounded shadow-md transform rotate-1">
                      <span className="font-handwriting text-xs text-pink-800 font-bold">MATERIALS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Right - Craft Process - Small */}
              <CrumpledPaperNote
                className="w-40 h-40"
                title="CRAFT"
                text="Hands & tools"
                tapeColor="kraft"
                pin
                stamp="research"
                coffeeRing
                enterFrom="right"
                index={0}
              />

              {/* Bottom Left - Community - Small */}
              <CrumpledPaperNote
                className="aspect-[3/4] w-40 h-40"
                title="COMMUNITY"
                text="Creators unite"
                tapeColor="pink"
                pin
                stamp="notes"
                enterFrom="left"
                index={1}
              />

              {/* Bottom Right - Sustainability - Small */}
              <CrumpledPaperNote
                className="aspect-[3/4] w-40 h-40"
                title="SUSTAINABILITY"
                text="Respect materials"
                tapeColor="kraft"
                pin
                variant='note'
                enterFrom="right"
                index={2}
              />
            </div>

            {/* Investigation board title */}
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow-md">
              <span className="text-sm font-bold text-stone-700">VISION BOARD</span>
            </div>

            {/* Additional sticky notes around the board */}
            <div className="absolute top-12 right-12 space-y-3">
              <div className="bg-yellow-300 px-3 py-2 rounded shadow-lg transform rotate-3">
                <span className="font-handwriting text-lg text-yellow-900 font-bold">INSPIRE</span>
              </div>
              <div className="bg-pink-300 px-3 py-2 rounded shadow-lg transform -rotate-2">
                <span className="font-handwriting text-lg text-pink-900 font-bold">CREATE</span>
              </div>
              <div className="bg-green-300 px-3 py-2 rounded shadow-lg transform rotate-1">
                <span className="font-handwriting text-lg text-green-900 font-bold">SHARE</span>
              </div>
            </div>

            {/* More sticky notes in corners */}
            <div className="absolute top-20 left-12 space-y-3">
              <div className="bg-blue-300 px-3 py-2 rounded shadow-lg transform -rotate-1">
                <span className="font-handwriting text-lg text-blue-900 font-bold">EXPERIMENT</span>
              </div>
              <div className="bg-purple-300 px-3 py-2 rounded shadow-lg transform rotate-2">
                <span className="font-handwriting text-lg text-purple-900 font-bold">LEARN</span>
              </div>
            </div>

            <div className="absolute bottom-20 right-12 space-y-3">
              <div className="bg-orange-300 px-3 py-2 rounded shadow-lg transform rotate-1">
                <span className="font-handwriting text-lg text-orange-900 font-bold">GROW</span>
              </div>
              <div className="bg-teal-300 px-3 py-2 rounded shadow-lg transform -rotate-2">
                <span className="font-handwriting text-lg text-teal-900 font-bold">CONNECT</span>
              </div>
            </div>

            {/* Torn paper with handwritten goals (like your reference) */}
            <div className="absolute bottom-12 left-12 bg-amber-50 p-4 rounded shadow-lg transform -rotate-1" style={{
              clipPath: 'polygon(0 0, 95% 0, 100% 10%, 100% 100%, 5% 100%, 0 90%)'
            }}>
              <div className="font-handwriting text-amber-900 font-bold space-y-1">
                <div className="text-lg">EMPOWER CREATORS</div>
                <div className="text-lg">BUILD COMMUNITY</div>
                <div className="text-lg">SHARE KNOWLEDGE</div>
                <div className="text-lg">MAKE A DIFFERENCE</div>
              </div>
            </div>

            {/* Additional torn paper elements */}
            <div className="absolute top-1/6 right-8 bg-white p-3 rounded shadow-lg transform rotate-2" style={{
              clipPath: 'polygon(0 0, 90% 0, 100% 15%, 100% 100%, 10% 100%, 0 85%)'
            }}>
              <div className="font-handwriting text-stone-800 font-bold text-sm">
                <div>IDEAS</div>
                <div>PROTOTYPES</div>
                <div>EXPERIMENTS</div>
              </div>
            </div>

            {/* Process Photos - Polaroid Style */}
            <div className="absolute top-24 left-1/4 space-y-2">
              <div className="bg-white p-2 rounded shadow-lg transform -rotate-1">
                <img src="/images/studio1.png" alt="Process step 1" className="w-16 h-16 object-cover rounded" />
                <div className="text-xs font-handwriting text-stone-600 mt-1">SKETCH</div>
              </div>
              <div className="bg-white p-2 rounded shadow-lg transform rotate-1">
                <img src="/images/studio2.png" alt="Process step 2" className="w-16 h-16 object-cover rounded" />
                <div className="text-xs font-handwriting text-stone-600 mt-1">CARVE</div>
              </div>
            </div>

            {/* Material Samples */}
            <div className="absolute bottom-24 left-1/4 space-y-2">
              <div className="bg-amber-100 p-2 rounded shadow-lg transform rotate-1">
                <div className="w-12 h-8 bg-amber-600 rounded mb-1"></div>
                <div className="text-xs font-handwriting text-amber-800">OAK</div>
              </div>
              <div className="bg-stone-100 p-2 rounded shadow-lg transform -rotate-1">
                <div className="w-12 h-8 bg-stone-400 rounded mb-1"></div>
                <div className="text-xs font-handwriting text-stone-700">CLAY</div>
              </div>
              <div className="bg-blue-100 p-2 rounded shadow-lg transform rotate-1">
                <div className="w-12 h-8 bg-blue-500 rounded mb-1"></div>
                <div className="text-xs font-handwriting text-blue-800">FABRIC</div>
              </div>
            </div>

            {/* Timeline & Progress */}
            <div className="absolute bottom-32 right-1/3 bg-white p-3 rounded shadow-lg transform -rotate-2">
              <div className="font-handwriting text-stone-800 font-bold text-sm space-y-1">
                <div className="text-amber-600">STARTED: MAR 2024</div>
                <div className="text-green-600">✓ SKETCH</div>
                <div className="text-green-600">✓ PROTOTYPE</div>
                <div className="text-yellow-600">◐ CARVE</div>
                <div className="text-gray-400">○ FINISH</div>
              </div>
            </div>

            {/* Collaborator Photos */}
            <div className="absolute bottom-32 right-1/4 space-y-2">
              <div className="bg-white p-2 rounded-full shadow-lg transform rotate-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="text-xs font-handwriting text-stone-600 mt-1 text-center">ALEX</div>
              </div>
              <div className="bg-white p-2 rounded-full shadow-lg transform -rotate-1">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div className="text-xs font-handwriting text-stone-600 mt-1 text-center">MIA</div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="absolute top-1/3 left-8 bg-yellow-50 p-3 rounded shadow-lg transform rotate-1" style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)'
            }}>
              <div className="font-handwriting text-amber-900 text-sm italic">
                "Every piece tells a story"
              </div>
              <div className="text-xs text-amber-700 mt-1">- Workshop Wisdom</div>
            </div>

            {/* Technical Specs */}
            <div className="absolute bottom-1/3 right-16 bg-gray-50 p-2 rounded shadow-lg transform -rotate-1">
              <div className="font-handwriting text-gray-800 text-xs space-y-1">
                <div className="font-bold">SPECS</div>
                <div>Wood: Oak 2cm</div>
                <div>Time: 8hrs</div>
                <div>Tools: 5</div>
              </div>
            </div>

            {/* Quality Check Card */}
            <div className="absolute top-40 left-12 bg-green-50 p-2 rounded shadow-lg transform rotate-2">
              <div className="font-handwriting text-green-800 text-xs space-y-1">
                <div className="font-bold">QUALITY</div>
                <div>✓ Sanded</div>
                <div>✓ Stained</div>
                <div>◐ Varnish</div>
              </div>
            </div>

            {/* Customer Feedback */}
            <div className="absolute top-2/6 right-8 bg-pink-50 p-3 rounded shadow-lg transform -rotate-1" style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 90%, 95% 100%, 0 100%)'
            }}>
              <div className="font-handwriting text-pink-800 text-xs">
                <div className="font-bold">FEEDBACK</div>
                <div>"Beautiful work!"</div>
                <div className="text-xs text-pink-600">- Sarah M.</div>
              </div>
            </div>

            {/* Workshop Schedule */}
            <div className="absolute bottom-80 left-20 bg-blue-50 p-8 rounded shadow-lg transform rotate-1">
              <div className="font-handwriting text-blue-800 text-xl space-y-1">
                <div className="font-bold">SCHEDULE</div>
                <div>Mon: Design</div>
                <div>Tue: Carve</div>
                <div>Wed: Finish</div>
              </div>
            </div>

            {/* Inspiration Board */}
            <div className="absolute top-56 left-1/3 bg-purple-50 p-4 rounded shadow-lg transform -rotate-2">
              <div className="font-handwriting text-purple-800 text-xs space-y-1">
                <div className="font-bold">INSPIRATION</div>
                <div>Nature textures</div>
                <div>Vintage patterns</div>
                <div>Modern minimalism</div>
              </div>
            </div>

            {/* Tool Checklist */}
            <div className="absolute bottom-48 right-12 bg-orange-50 p-2 rounded shadow-lg transform rotate-1">
              <div className="font-handwriting text-orange-800 text-xs space-y-1">
                <div className="font-bold">TOOLS</div>
                <div>✓ Chisel set</div>
                <div>✓ Sandpaper</div>
                <div>✓ Wood stain</div>
                <div>◐ Brushes</div>
              </div>
            </div>

            {/* Workshop Notes */}
            <div className="absolute top-60 right-1/3 bg-yellow-50 p-2 rounded shadow-lg transform -rotate-1">
              <div className="font-handwriting text-yellow-800 text-xs space-y-1">
                <div className="font-bold">NOTES</div>
                <div>Grain direction</div>
                <div>Moisture level</div>
                <div>Temperature</div>
              </div>
            </div>

            {/* Collaboration Status */}
            <div className="absolute bottom-56 left-1/3 bg-teal-50 p-2 rounded shadow-lg transform rotate-2">
              <div className="font-handwriting text-teal-800 text-xs space-y-1">
                <div className="font-bold">TEAM</div>
                <div>Alex: Design ✓</div>
                <div>Mia: Carve ◐</div>
                <div>Sam: Finish ○</div>
              </div>
            </div>

            {/* Measurement Notes */}
            <div className="absolute top-96 left-1/4 bg-indigo-50 p-2 rounded shadow-lg transform rotate-1">
              <div className="font-handwriting text-indigo-800 text-xs space-y-1">
                <div className="font-bold">DIMENSIONS</div>
                <div>L: 30cm</div>
                <div>W: 15cm</div>
                <div>H: 8cm</div>
              </div>
            </div>

            {/* Workshop Wisdom */}
            <div className="absolute bottom-80 right-1/6 bg-rose-50 p-6 rounded shadow-lg transform -rotate-2">
              <div className="font-handwriting text-rose-800 text-lg space-y-1">
                <div className="font-bold">WISDOM</div>
                <div>"Measure twice"</div>
                <div>"Cut once"</div>
                <div>"Sand smooth"</div>
              </div>
            </div>
          </div>

          {/* Workbench Strip */}
          <div className="relative border-t border-stone-700/40 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 items-stretch">
              <CrumpledPaperNote
                className="aspect-[5/4]"
                variant="process"
                title="Sketch"
                text="Loose ideas and forms on paper."
                tapeColor="blue"
                pin
                stamp="step 1"
                enterFrom="left"
                index={0}
              />
              <CrumpledPaperNote
                className="aspect-[5/4]"
                variant="process"
                title="Prototype"
                text="Test scale, balance, and feel."
                tapeColor="kraft"
                pin
                stamp="step 2"
                enterFrom="bottom"
                index={1}
              />
              <CrumpledPaperNote
                className="aspect-[5/4]"
                variant="process"
                title="Finish"
                text="Refine edges, surface, and details."
                tapeColor="pink"
                pin
                stamp="step 3"
                enterFrom="bottom"
                index={2}
              />
              <CrumpledPaperNote
                className="aspect-[5/4]"
                variant="process"
                title="Digitize"
                text="Capture, present, and share online."
                tapeColor="blue"
                pin
                stamp="step 4"
                enterFrom="right"
                index={3}
              />
            </div>
          </div>
        </div>
      </section>


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
