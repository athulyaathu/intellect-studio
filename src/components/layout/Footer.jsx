/* src/components/layout/Footer.jsx */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  // Theme detection – mirrors Navbar logic for visual consistency
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Same dark‑theme trigger used in Navbar (entering Portfolio section)
      setIsDarkTheme(scrollY >= vh * 3.5 - 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const footerTheme = isDarkTheme
    ? "bg-neutral-950/80 border-white/10 text-white"
    : "bg-white/80 border-black/5 text-neutral-900";

  const linkHover = isDarkTheme ? "hover:text-cyan-400" : "hover:text-neutral-500";

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t ${footerTheme} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <Link
          href="/"
          className="font-sans font-black tracking-widest uppercase text-xs sm:text-sm select-none"
          style={{ letterSpacing: "0.25em" }}
        >
          INTELLECT STUDIO
        </Link>

        {/* Navigation links – minimal set */}
        <nav className="flex flex-wrap items-center gap-4 text-[11px] font-mono uppercase tracking-widest">
          <Link href="#about" className={`transition-colors duration-300 ${linkHover}`}>About</Link>
          <Link href="#portfolio" className={`transition-colors duration-300 ${linkHover}`}>Portfolio</Link>
          <Link href="#contact" className={`transition-colors duration-300 ${linkHover}`}>Contact</Link>
        </nav>

        {/* Social / contact */}
        <div className="flex items-center gap-3 text-sm">
          <a href="mailto:info@intellectstudio.com" className={`transition-colors duration-300 ${linkHover}`}>info@intellectstudio.com</a>
          <a href="https://twitter.com/intellectstudio" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${linkHover}`}>Twitter</a>
          <a href="https://github.com/intellectstudio" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${linkHover}`}>GitHub</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center md:text-right w-full md:w-auto">
          © {currentYear} INTELLECT STUDIO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
