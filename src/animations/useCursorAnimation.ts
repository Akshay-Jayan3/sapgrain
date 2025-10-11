import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CursorRefs {
  dotRef: React.RefObject<HTMLDivElement>;
  ringRef: React.RefObject<HTMLDivElement>;
}

export const useCursorAnimation = ({ dotRef, ringRef }: CursorRefs) => {
  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    const speed = 0.2; // Adjust for smoother trailing

    const xSetDot = gsap.quickSetter(dot, 'x', 'px');
    const ySetDot = gsap.quickSetter(dot, 'y', 'px');
    const xSetRing = gsap.quickSetter(ring, 'x', 'px');
    const ySetRing = gsap.quickSetter(ring, 'y', 'px');

    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;

      xSetDot(mouse.x);
      ySetDot(mouse.y);
      xSetRing(pos.x);
      ySetRing(pos.y);
    });

    const handleHover = () => {
      gsap.to(ring, {
        scale: 1.6,
        '--glow-opacity': 0.8,
        backgroundColor: 'rgba(198,166,100,0.6)',
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const handleUnhover = () => {
      gsap.to(ring, {
        scale: 1,
        '--glow-opacity': 0.3,
        backgroundColor: 'rgba(198,166,100,0.3)',
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    document.querySelectorAll('a, button, .interactive, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      gsap.ticker.remove(() => {});
      document.querySelectorAll('a, button, .interactive, input, textarea').forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, [dotRef, ringRef]);
};
