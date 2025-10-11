'use client';
import React, { useRef } from 'react';
import { useCursorAnimation } from '@/animations/useCursorAnimation';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useCursorAnimation({ dotRef: dotRef as React.RefObject<HTMLDivElement>, ringRef: ringRef as React.RefObject<HTMLDivElement> });

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-[9999] w-2 h-2 bg-white rounded-full pointer-events-none"
      ></div>
      <div
        ref={ringRef}
        className="fixed z-[9999] w-10 h-10 rounded-full pointer-events-none blur-md opacity-70"
        style={{
          backgroundColor: 'rgba(198,166,100,0.3)',
          boxShadow: '0 0 15px rgba(198,166,100, var(--glow-opacity, 0.3))',
          transition: 'background-color 0.5s ease-out, box-shadow 0.5s ease-out',
          '--glow-opacity': 0.3,
        } as React.CSSProperties}
      ></div>
    </>
  );
};

export default CustomCursor;
