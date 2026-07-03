"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Metrics', href: '#metrics' },
  { label: 'Teams', href: '/teams' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/intellectstudio' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/intellectstudio' },
  { label: 'Dribbble', href: 'https://dribbble.com/intellectstudio' },
];

function useBackToTop() {
  return useCallback(() => {
    const start = window.scrollY;
    const duration = 900;
    const startTime = performance.now();

    const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - easeOutCubic(progress)));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);
}

export default function Footer() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const backToTop = useBackToTop();
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsDarkTheme(scrollY >= viewportHeight * 3.5 - 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal animation: run once when footer enters viewport.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = footerRef.current;
    if (!el) return;

    const gsap = require('gsap').default;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion, ensure visible and exit early
    if (reduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    // Initial hidden state
    gsap.set(el, { y: 24, opacity: 0 });

    let observer;
    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(el, { y: 0, opacity: 1, duration: 0.38, ease: 'power3.out' });
          if (observer) observer.disconnect();
        }
      });
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.08 });
      observer.observe(el);
    } else {
      // Fallback: simple timeout after mount
      const t = setTimeout(() => gsap.to(el, { y: 0, opacity: 1, duration: 0.38, ease: 'power3.out' }), 300);
      return () => clearTimeout(t);
    }

    return () => observer && observer.disconnect();
  }, []);

  const footerTheme = isDarkTheme
    ? 'border-slate-800 bg-slate-950 text-slate-50'
    : 'border-slate-200 bg-white text-slate-900';
  const mutedText = isDarkTheme ? 'text-slate-400' : 'text-slate-500';
  const linkHover = isDarkTheme ? 'hover:text-cyan-400' : 'hover:text-cyan-600';
  const dividerColor = isDarkTheme ? 'bg-slate-800' : 'bg-slate-200';
  const buttonTheme = isDarkTheme
    ? 'border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-400'
    : 'border-slate-300 text-slate-600 hover:border-cyan-600 hover:text-cyan-600';

  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" role="contentinfo" aria-label="Site footer" className={`border-t transition-colors duration-500 ${footerTheme}`}>
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 md:px-12 md:py-12 lg:px-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:gap-8 lg:gap-10">
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-sm font-black uppercase tracking-[0.3em]" aria-label="Intellect Studio — home">
              Intellect Studio
            </Link>
            <p className={`max-w-[24ch] text-[11px] leading-relaxed ${mutedText}`}>
              Designing and building digital experiences that feel precise, calm, and unmistakably modern.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${mutedText}`}>
              Navigate
            </span>
            {navLinks.map((link) =>
              link.href.startsWith('#') ? (
                <a key={link.label} href={link.href} className={`text-[11px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${linkHover}`}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href} className={`text-[11px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${linkHover}`}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex flex-col gap-3">
            <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${mutedText}`}>
              Contact
            </span>
            <a href="mailto:hello@intellectstudio.com" className={`text-[11px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${linkHover}`}>
              hello@intellectstudio.com
            </a>
            <div className={`mt-1 h-px w-8 ${dividerColor}`} aria-hidden="true" />
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={`text-[11px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${linkHover}`}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`border-t ${isDarkTheme ? 'border-white/10' : 'border-black/10'}`}>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 sm:flex-row md:px-12">
          <p className={`text-[10px] font-mono uppercase tracking-[0.2em] ${mutedText}`}>
            © {currentYear} Intellect Studio. All rights reserved.
          </p>
          <button
            type="button"
            onClick={backToTop}
            className={`rounded-full border px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${buttonTheme}`}
            aria-label="Scroll back to top"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
