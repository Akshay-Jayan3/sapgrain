import React from 'react';
import Link from 'next/link';
import SectionHeading from './SectionHeading';

const CallToAction: React.FC = () => {
  return (
    <section id="cta" className="relative bg-[url('/images/wood-grain.png')] bg-cover bg-center py-24 px-8 text-center">
      <div className="absolute inset-0 opacity-70" />
      <div className="relative z-10 container mx-auto">
        <SectionHeading level="h2" className="text-orange-100 text-5xl md:text-6xl font-bold mb-6">
          Ready to Create?
        </SectionHeading>
        <p className="text-orange-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Join our community of makers and discover endless possibilities. Whether you're a seasoned artisan or just starting, Sapgrain is your canvas.
        </p>
        <Link href="/contact" className="inline-block bg-amber-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105">
          Get Started Today
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
