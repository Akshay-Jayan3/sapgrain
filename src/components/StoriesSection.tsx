import React, { useEffect, useRef } from 'react';
import BookCard from './BookCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StoryData {
  id: string;
  title: string;
  excerpt: string;
  ctaLink: string;
  coverImage?: string;
}

const stories: StoryData[] = [
  {
    id: '1',
    title: "The Artisan's Journey",
    excerpt: 'Discover the path less traveled, where every chisel stroke tells a tale of dedication and passion...',
    ctaLink: '/stories/artisan-journey',
    coverImage: '/images/studio1.png'
  },
  {
    id: '2',
    title: 'Whispers of Wood',
    excerpt: 'In the heart of the forest, where ancient trees share their secrets, a craftsman listens and transforms...',
    ctaLink: '/stories/whispers-of-wood',
    coverImage: '/images/wood-grain.png'
  },
  {
    id: '3',
    title: 'Crafting Tomorrow',
    excerpt: 'Blending traditional techniques with modern vision, we shape not just objects, but futures...',
    ctaLink: '/stories/crafting-tomorrow',
    coverImage: '/images/craft-bg.png'
  },
  {
    id: '4',
    title: 'Legacy in Grain',
    excerpt: 'Generations of skill, passed down through nimble hands, imbue each piece with a timeless soul...',
    ctaLink: '/stories/legacy-in-grain',
    coverImage: '/images/creation1.png'
  },
  {
    id: '5',
    title: 'The Sculpted Dream',
    excerpt: 'From raw material to refined form, the artist\'s dream takes shape, inviting you to touch and feel...',
    ctaLink: '/stories/sculpted-dream',
    coverImage: '/images/creation2.png'
  },
];

const StoriesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card, 
        { autoAlpha: 0, y: 50, rotateY: 90 }, 
        { 
          autoAlpha: 1, 
          y: 0, 
          rotateY: 0, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // When the top of the card enters 80% of the viewport
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1, // Stagger the animation
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="stories"
      ref={sectionRef}
      className="py-20 bg-[url('/images/wood-grain.png')] bg-cover bg-fixed text-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold font-serif text-center mb-16 text-[#7C6A4E] drop-shadow-lg">
          Stories We Carve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {stories.map((story, index) => (
            <div key={story.id} ref={el => {
              if (el) cardsRef.current[index] = el;
            }}>
              <BookCard
                title={story.title}
                excerpt={story.excerpt}
                ctaLink={story.ctaLink}
                coverImage={story.coverImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
