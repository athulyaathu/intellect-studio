"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Navbar from '../layout/Navbar';

export default function HeroSection() {
  const sectionRef  = useRef(null);
  const heroTextRef = useRef(null);
  const studioTextRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef  = useRef(null);
  const magneticRefs = useRef([]);

  // Magnetic pull effect
  useEffect(() => {
    const RADIUS   = 80;
    const STRENGTH = 0.35;

    const handlers = magneticRefs.current.map((el) => {
      if (!el) return null;

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = e.clientX - cx;
        const dy   = e.clientY - cy;

        if (Math.hypot(dx, dy) < RADIUS) {
          gsap.to(el, { x: dx * STRENGTH, y: dy * STRENGTH, duration: 0.3, ease: 'power2.out' });
        }
      };

      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return { el, onMove, onLeave };
    });

    return () => {
      handlers.forEach((h) => {
        if (!h) return;
        h.el.removeEventListener('mousemove', h.onMove);
        h.el.removeEventListener('mouseleave', h.onLeave);
      });
    };
  }, []);

  const addMagneticRef = (el) => {
    if (el && !magneticRefs.current.includes(el)) magneticRefs.current.push(el);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-white flex flex-col justify-between"
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,0,0,0.02) 0%, transparent 75%)',
          zIndex: 0,
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-5xl mt-16">
        <div ref={heroTextRef} className="space-y-0.5">
          <h1
            className="font-sans font-black text-black leading-none tracking-tighter select-none"
            style={{ fontSize: 'clamp(4rem, 13vw, 13rem)', lineHeight: 0.85 }}
          >
            INTELLECT
          </h1>
          <h2
            ref={studioTextRef}
            className="font-sans font-black leading-none tracking-tighter select-none"
            style={{
              fontSize: 'clamp(4rem, 13vw, 13rem)',
              lineHeight: 0.85,
              color: '#A3A3A3',
            }}
          >
            STUDIO
          </h2>
        </div>

        {/* Editorial paragraph */}
        <p
          ref={subtitleRef}
          className="font-sans text-neutral-500 mt-6 md:mt-8 max-w-md text-sm md:text-base leading-relaxed tracking-wide"
        >
          We design, build, and launch digital experiences that define tomorrow. Shaping ideas into high-performance web products.
        </p>

        {/* Button suite */}
        <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 mt-8 md:mt-10">
          <a
            ref={addMagneticRef}
            href="mailto:hello@intellectstudio.com"
            className="magnetic-btn border border-neutral-200 hover:border-neutral-900 text-neutral-500 hover:text-neutral-900 px-5 py-3 text-[10px] md:text-xs font-mono uppercase tracking-widest transition-colors duration-300"
          >
            Email Us
          </a>
          <a
            ref={addMagneticRef}
            href="tel:+1234567890"
            className="magnetic-btn border border-neutral-200 hover:border-neutral-900 text-neutral-500 hover:text-neutral-900 px-5 py-3 text-[10px] md:text-xs font-mono uppercase tracking-widest transition-colors duration-300"
          >
            Call Us
          </a>

          <div className="w-px h-6 bg-neutral-200 mx-1 hidden md:block" />

          <a
            ref={addMagneticRef}
            href="#register"
            className="magnetic-btn border border-neutral-200 hover:border-neutral-900 text-neutral-500 hover:text-neutral-900 px-5 py-3 text-[10px] md:text-xs font-mono uppercase tracking-widest transition-colors duration-300"
          >
            Register
          </a>

          <Link
            href="/teams"
            className="bg-black hover:bg-neutral-800 text-white px-6 py-3 text-[10px] md:text-xs font-mono uppercase tracking-widest transition-colors duration-300 rounded-none shadow-sm"
          >
            Teams
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 pb-8 flex items-center gap-3">
        <div className="w-8 h-px bg-neutral-300" />
        <span className="font-mono text-[9px] md:text-[10px] text-neutral-400 tracking-[0.25em] uppercase select-none">
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}

