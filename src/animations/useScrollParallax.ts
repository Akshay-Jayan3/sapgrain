import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollParallaxProps {
  target: React.RefObject<HTMLElement>;
  speed?: number;
  direction?: 'y' | 'x';
  start?: string;
  end?: string;
}

export const useScrollParallax = ({
  target,
  speed = -20,
  direction = 'y',
  start = 'top bottom',
  end = 'bottom top',
}: ScrollParallaxProps) => {
  useEffect(() => {
    const element = target.current;

    if (!element) return;

    gsap.to(element, {
      [direction]: `${speed}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: start,
        end: end,
        scrub: true,
      },
    });
  }, [target, speed, direction, start, end]);
};
