'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {

  return (
    <footer className="bg-[url('/images/wood-grain.png')] bg-cover bg-fixed text-white py-8 text-center relative z-10">
      <p className="font-body text-sm">
        &copy; {new Date().getFullYear()} Sapgrain. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
