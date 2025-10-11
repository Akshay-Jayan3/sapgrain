'use client';
import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Creations', href: '#creations' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Studio', href: '#studio' },
    { name: 'Contact', href: '#contact' },
    { name: 'Journal', href: '#journal' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background bg-opacity-80 backdrop-blur-sm p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="#hero" className="text-text text-2xl font-heading font-bold interactive">
          Sapgrain
        </Link>
        <ul className="flex space-x-6">
          {navLinks.map(link => (
            <li key={link.name}>
              <Link href={link.href} className="text-text hover:text-accent transition-colors duration-300 interactive">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
