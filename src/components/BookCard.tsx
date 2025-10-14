import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface BookCardProps {
  title: string;
  excerpt: string;
  ctaLink: string;
  coverImage?: string; // Optional: for custom book cover images
}

const BookCard: React.FC<BookCardProps> = ({ title, excerpt, ctaLink, coverImage }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateY: isFlipped ? 180 : 0,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          // Add any post-flip actions here
        }
      });
    }
  }, [isFlipped]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // Max 10 degrees rotation
    const rotateY = ((x - centerX) / centerX) * -10; // Max 10 degrees rotation

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY + (isFlipped ? 180 : 0), // Maintain flip rotation
      scale: 1.03,
      duration: 0.3,
      ease: "power1.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: isFlipped ? 180 : 0, // Reset to flipped or unflipped state
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative w-72 h-96 perspective-1000 cursor-pointer will-change-transform rounded-lg"
      onClick={handleFlip}
      onMouseEnter={() => !isFlipped && setIsFlipped(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Front Cover */}
      <div
        className="absolute w-full h-full bg-cover bg-center rounded-lg shadow-lg flex items-center justify-center p-6 backface-hidden"
        style={{ backgroundImage: `url(${coverImage || '/images/wood-grain.png'})`, transform: 'rotateY(0deg)' }}
      >
        <h3 className="text-3xl font-serif text-[#F5F1E9] text-center drop-shadow-md">
          {title}
        </h3>
      </div>

      {/* Inner Page (Back Side) */}
      <div
        className="absolute w-full h-full bg-[#F5F1E9] rounded-lg shadow-lg p-6 flex flex-col justify-between items-center backface-hidden"
        style={{ transform: 'rotateY(180deg)' }}
      >
        <p className="text-gray-800 font-serif text-lg text-center leading-relaxed">
          {excerpt}
        </p>
        <a
          href={ctaLink}
          className="mt-4 px-6 py-3 bg-[#7C6A4E] text-[#F5F1E9] rounded-full text-lg font-medium hover:bg-[#60523C] transition-colors duration-300"
        >
          Read Story
        </a>
      </div>
    </div>
  );
};

export default BookCard;
