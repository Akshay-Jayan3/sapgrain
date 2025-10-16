'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {

  return (
    <footer className="relative z-10 text-white py-8 px-4 text-center bg-[#170b08]" >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Copyright */}
        <div className="mb-2 md:mb-0">
          <p className="font-body text-sm text-stone-100">
            &copy; {new Date().getFullYear()} Sapgrain. All rights reserved.
          </p>
        </div>

        {/* Center: Social media links */}
        <div className="flex items-center gap-5">
          <a 
            href="https://twitter.com/sapgrain" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Sapgrain Twitter"
            className="hover:text-stone-900 transition"
          >
            <svg width="22" height="22" fill="none" className="inline-block" viewBox="0 0 24 24">
              <path fill="currentColor" d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.338.362c-.864.51-1.82.878-2.83 1.077A4.48 4.48 0 0016.616.512c-2.475 0-4.482 2.01-4.482 4.487 0 .351.04.693.111 1.019C8.014 5.838 4.504 4.08 2.115 1.163c-.386.664-.614 1.439-.614 2.266 0 1.565.793 2.946 2.002 3.756a4.481 4.481 0 01-2.027-.561v.057c0 2.187 1.555 4.014 3.625 4.426a4.483 4.483 0 01-2.02.076c.572 1.791 2.229 3.093 4.194 3.128A8.99 8.99 0 012 19.542c1.987 1.271 4.353 2.017 6.894 2.017C19.087 21.56 23 13.74 23 7.11c0-.18-.005-.36-.013-.54A8.32 8.32 0 0023 3z"></path>
            </svg>
          </a>
          <a 
            href="https://instagram.com/sapgrain" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Sapgrain Instagram"
            className="hover:text-stone-900 transition"
          >
            <svg width="22" height="22" fill="none" className="inline-block" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7.75 2h8.5A5.25 5.25 0 0121.5 7.25v8.5A5.25 5.25 0 0116.25 21h-8.5A5.25 5.25 0 012 15.75v-8.5A5.25 5.25 0 017.75 2zm0 1.5A3.75 3.75 0 004 7.25v8.5A3.75 3.75 0 007.75 19.5h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 3.5h-8.5zm4.25 2.25A6.25 6.25 0 1116.25 16.25 6.25 6.25 0 0112 5.75zm0 1.5a4.75 4.75 0 104.75 4.75A4.75 4.75 0 0012 7.25zm6.13-.38a1.12 1.12 0 11-1.13-1.12 1.12 1.12 0 011.13 1.12z"></path>
            </svg>
          </a>
          <a 
            href="https://www.facebook.com/sapgrain" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Sapgrain Facebook"
            className="hover:text-stone-900 transition"
          >
            <svg width="22" height="22" fill="none" className="inline-block" viewBox="0 0 24 24">
              <path fill="currentColor" d="M17 3H7a4 4 0 00-4 4v10a4 4 0 004 4h4v-7H9v-3h2V8.5A3.5 3.5 0 0114.5 5h2.5v3h-2.5a.5.5 0 00-.5.5V10h3l-.5 3H14v7h3a4 4 0 004-4V7a4 4 0 00-4-4z"></path>
            </svg>
          </a>
        </div>
        
        {/* Right: Other Links */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <a 
            href="https://woodworks.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs underline text-stone-900 hover:text-white transition"
          >
            Woodworks
          </a>
          <a 
            href="https://makerscollective.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs underline text-stone-900 hover:text-white transition"
          >
            Makers Collective
          </a>
          <a
            href="/privacy"
            className="font-body text-xs underline text-stone-900 hover:text-white transition"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="font-body text-xs underline text-stone-900 hover:text-white transition"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
