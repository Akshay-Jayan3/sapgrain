import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  target: React.RefObject<HTMLElement | null>;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export const useRevealText = ({
  target,
  delay = 0,
  duration = 1.2,
  yOffset = 50,
}: RevealTextProps) => {
  useEffect(() => {
    const element = target.current;

    if (!element) return;

    gsap.fromTo(
      element as HTMLElement,
      {
        opacity: 0,
        y: yOffset,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [target, delay, duration, yOffset]);
};
