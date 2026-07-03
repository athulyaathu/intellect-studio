"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui';

const navLinks = [
  { label: 'About', href: '#about', type: 'anchor' },
  { label: 'Portfolio', href: '#portfolio', type: 'anchor' },
  { label: 'Metrics', href: '#metrics', type: 'anchor' },
  { label: 'Teams', href: '/teams', type: 'route' },
  { label: 'Contact', href: '#contact', type: 'anchor' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const headerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;

      setIsVisible(scrollY >= viewportHeight * 1.5 - 60);
      setIsDarkTheme(scrollY >= viewportHeight * 3.5 - 80);
      setScrollProgress(maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth show/hide and theme transitions using GSAP
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const gsap = require('gsap').default;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = headerRef.current;
    const pbar = progressRef.current;
    if (!el) return;

    const showY = 0;
    const hideY = -120;

    if (reduced) {
      el.style.transform = isVisible ? 'translateY(0)' : `translateY(${hideY}px)`;
      el.style.opacity = isVisible ? '1' : '0';
      el.style.pointerEvents = isVisible ? 'auto' : 'none';
    } else {
      gsap.to(el, {
        y: isVisible ? showY : hideY,
        opacity: isVisible ? 1 : 0,
        duration: 0.38,
        ease: 'expo.out',
        onStart: () => {
          if (isVisible) el.style.pointerEvents = 'auto';
        },
        onComplete: () => {
          if (!isVisible) el.style.pointerEvents = 'none';
        },
      });
    }

    // Theme transition: animate background/border/text colors
    const light = { bg: 'rgba(255,255,255,0.9)', border: '#e6edf3', color: '#0f172a', progress: '#06b6d4' };
    const dark = { bg: 'rgba(7,12,17,0.95)', border: '#0b1220', color: '#f8fafc', progress: '#67e8f9' };
    const target = isDarkTheme ? dark : light;

    if (reduced) {
      el.style.backgroundColor = target.bg;
      el.style.borderColor = target.border;
      el.style.color = target.color;
      if (pbar) pbar.style.backgroundColor = target.progress;
    } else {
      gsap.to(el, { backgroundColor: target.bg, borderColor: target.border, color: target.color, duration: 0.45, ease: 'power3.out' });
      if (pbar) gsap.to(pbar, { backgroundColor: target.progress, duration: 0.45, ease: 'power3.out' });
    }

    return () => {};
  }, [isVisible, isDarkTheme]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navbarTheme = isDarkTheme
    ? 'border-slate-800 bg-slate-950/95 text-slate-50'
    : 'border-slate-200 bg-white/90 text-slate-900';

  const mobileMenuTheme = isDarkTheme
    ? 'border-slate-800 bg-slate-950 text-slate-50'
    : 'border-slate-200 bg-white text-slate-900';

  const progressColor = isDarkTheme ? 'bg-cyan-400' : 'bg-cyan-500';
  const linkHover = isDarkTheme ? 'hover:text-cyan-400' : 'hover:text-cyan-600';
  const buttonTheme = isDarkTheme ? 'dark' : undefined;

  const renderLink = (link, extraClass = '') => {
    const isActive = link.type === 'route' && pathname === link.href;
    const baseClass = [
      'font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300',
      linkHover,
      extraClass,
    ].filter(Boolean).join(' ');

    if (link.type === 'route') {
      return (
        <Link
          key={link.label}
          href={link.href}
          className={baseClass}
          aria-current={isActive ? 'page' : undefined}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <a
        key={link.label}
        href={link.href}
        className={baseClass}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {link.label}
      </a>
    );
  };

  return (
    <header
      ref={headerRef}
      id="site-navbar"
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md ${navbarTheme}`}
      style={{ transform: 'translateY(-120px)', opacity: 0 }}
    >
      <div
        ref={progressRef}
        className={`absolute inset-x-0 top-0 h-[2px] ${progressColor}`}
        style={{ width: `${scrollProgress * 100}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-label="Page scroll progress"
      />

      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="select-none text-[10px] font-black uppercase tracking-[0.25em] sm:text-[11px] sm:tracking-[0.3em]"
          aria-label="Intellect Studio — home"
        >
          Intellect Studio
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => renderLink(link))}
        </nav>

        <div className="hidden md:block">
          <Button as="a" href="#contact" magnetic size="sm" dark={buttonTheme === 'dark'}>
            Apply Now
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-current outline-none transition-colors duration-300 focus-visible:border-current focus-visible:ring-2 focus-visible:ring-current/40 md:hidden"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="flex flex-col items-center gap-1.5">
            <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-x-0 top-20 z-[60] h-[calc(100vh-5rem)] border-t transition-all duration-300 ease-out md:hidden ${mobileMenuTheme} ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-6 px-6 pb-20 sm:gap-8">
          {navLinks.map((link) => renderLink(link, 'text-base'))}
          <Button as="a" href="#contact" magnetic size="md" dark={buttonTheme === 'dark'} onClick={() => setIsMobileMenuOpen(false)}>
            Apply Now
          </Button>
        </div>
      </div>
    </header>
  );
}
