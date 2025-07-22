'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mobile menu animation
  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 },
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > 100) {
        if (currentY > lastScrollY) {
          setShowNavbar(false); // hide on scroll down
        } else {
          setShowNavbar(true); // show on scroll up
        }
      }

      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Animated Navbar Wrapper */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className="font-dominik text-secondary fixed top-0 left-0 z-50 flex justify-between items-center py-4 md:py-8 md:px-16 w-full text-white dark:bg transition-transform duration-300"
      >
        {/* Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center"
        >
          <Image
            src="/images/vexa-primary.png"
            alt="Logo"
            width={160}
            height={20}
            className="object-contain"
          />
        </motion.a>

        {/* Toggle Button */}
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <button onClick={() => setIsOpen((prev) => !prev)} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-7 h-7 me-6 md:me-8 text-secondary text-primary transition duration-200"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </motion.div>
      </motion.nav>

      {/* Slide-in Mobile Menu */}
      <motion.div
        className="font-caviar fixed flex flex-col items-center text-primary bg-white justify-center h-full w-full shadow-md z-40 pt-12"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={mobileMenuVariants}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        {/* Nav Links */}
        <motion.ul
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.7 }}
          className="font-dominik flex flex-col space-y-6 text-secondary text-4xl py-4 px-8"
        >
          {['Home', 'About', 'Works', 'Contact', 'Services'].map((item, index) => (
            <li key={index}>
              <Link
                href={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </motion.ul>

        {/* Bottom Left Email */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden md:block absolute bottom-8 left-8 text-sm text-secondary"
        >
          <Link
            href="mailto:vexarchitect@gmail.com"
            className="ms-16 hover:underline transition-all duration-200 font-dominik"
          >
            vexarchitect@gmail.com
          </Link>
        </motion.div>

        {/* Bottom Right Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute bottom-8 right-8 flex space-x-6 me-8"
        >
          <Link href="https://www.instagram.com" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-secondary hover:text-black transform hover:rotate-12 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2C5.13 2 3 4.13 3 6.75v10.5C3 19.87 5.13 22 7.75 22h8.5C18.87 22 21 19.87 21 17.25V6.75C21 4.13 18.87 2 16.25 2h-8.5zM5 6.75C5 5.78 5.78 5 6.75 5h10.5c.97 0 1.75.78 1.75 1.75v10.5c0 .97-.78 1.75-1.75 1.75H6.75C5.78 19 5 18.22 5 17.25V6.75zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 1.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm4.75-.88a.88.88 0 1 0 0 1.75.88.88 0 0 0 0-1.75z" />
            </svg>
          </Link>

          <Link href="https://www.linkedin.com/in/muhammed-safwan-pm" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-secondary hover:text-black transform hover:rotate-12 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.5c-1.03 0-1.5-.84-1.5-1.5 0-.66.47-1.5 1.5-1.5s1.5.84 1.5 1.5c0 .66-.47 1.5-1.5 1.5zm13.5 12.5h-3v-5.5c0-3.67-4-3.38-4 0v5.5h-3v-11h3v1.5c1.4-2.58 7-2.78 7 2.47v7.03z" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;
