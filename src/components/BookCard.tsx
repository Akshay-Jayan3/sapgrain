import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface BookCardProps {
  title: string;
  excerpt: string;
  ctaLink: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, excerpt, ctaLink }) => {
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
      ease:"sine.in"    });
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
      className="relative w-72 h-72 perspective-1000 cursor-pointer will-change-transform rounded-lg"
      onClick={handleFlip}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Front Cover */}
      <div
        className="absolute w-full h-full bg-contain bg-no-repeat rounded-lg shadow-lg flex items-center justify-center p-6 backface-hidden bg-[url('/images/book-cover.png')]"
        style={{ transform: 'rotateY(0deg)' }}
      >
        <div className="flex flex-col items-center justify-between w-full h-full text-yellow-200">
          <p className="font-body text-xs md:text-sm mb-1">THE ART OF CREATION</p>
          <h3 className="font-heading text-xl md:text-3xl font-bold text-center leading-tight mb-2">
            {title}
          </h3>
          <p className="font-body text-xs md:text-sm">OCTOBER 2025 | VOL. 1</p>
        </div>
      </div>

      {/* Inner Page (Back Side) */}
      <div
        className="absolute w-full h-full bg-[#F5F1E9] rounded-lg shadow-lg p-6 flex flex-col justify-between items-center backface-hidden border-2 border-stone-800"
        style={{ transform: 'rotateY(180deg)' }}
      >
        <p className="text-gray-600 font-body text-base text-left leading-relaxed flex-grow overflow-y-auto mb-4">
          {excerpt}
        </p>
        <a
          href={ctaLink}
          className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-full text-sm font-medium hover:bg-amber-800 transition-colors duration-300 self-center"
        >
          Read Story
        </a>
      </div>
    </div>
  );
};

export default BookCard;
