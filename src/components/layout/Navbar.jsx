"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const applyButtonRef = useRef(null);
  const mobileApplyButtonRef = useRef(null);

  // Dynamic visibility and theme shifting based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      // Visibility: Show navbar after the VRPortal runway (1.5vh)
      setIsVisible(scrollY >= vh * 1.5 - 60);

      // Theme: Switch to dark theme when entering Portfolio section (runway 1.5vh + hero 1vh + about 1vh = 3.5vh)
      setIsDarkTheme(scrollY >= vh * 3.5 - 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Self-contained magnetic pull effect for the CTA button
  useEffect(() => {
    const applyMagnetic = (buttonEl) => {
      if (!buttonEl) return;
      const RADIUS = 65;
      const STRENGTH = 0.25;

      const onMove = (e) => {
        const rect = buttonEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        if (Math.hypot(dx, dy) < RADIUS) {
          buttonEl.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
        }
      };

      const onLeave = () => {
        buttonEl.style.transform = `translate(0px, 0px)`;
      };

      window.addEventListener('mousemove', onMove);
      buttonEl.addEventListener('mouseleave', onLeave);

      return () => {
        window.removeEventListener('mousemove', onMove);
        buttonEl.removeEventListener('mouseleave', onLeave);
      };
    };

    const cleanupApply = applyMagnetic(applyButtonRef.current);
    const cleanupMobileApply = applyMagnetic(mobileApplyButtonRef.current);

    return () => {
      if (cleanupApply) cleanupApply();
      if (cleanupMobileApply) cleanupMobileApply();
    };
  }, [isVisible, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { label: 'About', href: '#about', type: 'anchor' },
    { label: 'Portfolio', href: '#portfolio', type: 'anchor' },
    { label: 'Metrics', href: '#metrics', type: 'anchor' },
    { label: 'Teams', href: '/teams', type: 'route' },
    { label: 'Contact', href: '#contact', type: 'anchor' },
  ];

  // Colors & Themes styling matching black/white/gray aesthetic
  const navbarTheme = isDarkTheme
    ? 'bg-neutral-950/80 border-white/10 text-white'
    : 'bg-white/80 border-black/5 text-neutral-900';

  const mobileMenuTheme = isDarkTheme
    ? 'bg-neutral-950 text-white border-white/10'
    : 'bg-white text-neutral-900 border-black/5';

  const linkHover = isDarkTheme
    ? 'hover:text-cyan-400'
    : 'hover:text-neutral-500';

  const btnTheme = isDarkTheme
    ? 'bg-white text-black hover:bg-neutral-200'
    : 'bg-black text-white hover:bg-neutral-800';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-md transition-all duration-500 ease-out ${navbarTheme} ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="font-sans font-black tracking-widest uppercase text-xs sm:text-sm select-none"
          style={{ letterSpacing: '0.25em' }}
        >
          INTELLECT STUDIO
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.type === 'route' ? (
              <Link
                key={link.label}
                href={link.href}
                className={`font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ${linkHover}`}
                style={{ letterSpacing: '0.15em' }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ${linkHover}`}
                style={{ letterSpacing: '0.15em' }}
              >
                {link.label}
              </a>
            )
          ))}
        </nav>

        {/* Desktop Apply CTA */}
        <div className="hidden md:block">
          <a
            ref={applyButtonRef}
            href="#contact"
            className={`magnetic-btn inline-block font-sans font-bold text-xs tracking-wider uppercase px-6 py-3 transition-colors duration-300 ${btnTheme}`}
            style={{ letterSpacing: '0.08em' }}
          >
            Apply Now →
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <span 
            className={`w-6 h-0.5 transition-all duration-300 transform ${isDarkTheme ? 'bg-white' : 'bg-black'} ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span 
            className={`w-6 h-0.5 transition-all duration-300 ${isDarkTheme ? 'bg-white' : 'bg-black'} ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span 
            className={`w-6 h-0.5 transition-all duration-300 transform ${isDarkTheme ? 'bg-white' : 'bg-black'} ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <div
        className={`md:hidden fixed top-20 left-0 right-0 bottom-0 z-40 w-full h-[calc(100vh-5rem)] border-t transition-all duration-300 ease-in-out ${mobileMenuTheme} ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6 pb-20">
          {navLinks.map((link) => (
            link.type === 'route' ? (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-mono text-base uppercase tracking-widest transition-colors duration-300 ${linkHover}`}
                style={{ letterSpacing: '0.2em' }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-mono text-base uppercase tracking-widest transition-colors duration-300 ${linkHover}`}
                style={{ letterSpacing: '0.2em' }}
              >
                {link.label}
              </a>
            )
          ))}
          <a
            ref={mobileApplyButtonRef}
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`magnetic-btn font-sans font-bold text-xs tracking-wider uppercase px-8 py-4 mt-4 transition-colors duration-300 ${btnTheme}`}
            style={{ letterSpacing: '0.1em' }}
          >
            Apply Now →
          </a>
        </div>
      </div>
    </header>
  );
}
