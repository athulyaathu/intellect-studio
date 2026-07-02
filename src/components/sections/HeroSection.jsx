"use client";

import Link from 'next/link';
import { Button, Container } from '../ui';

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_55%,#f0f9ff_100%)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(0,0,0,0.03) 0%, transparent 75%)',
          zIndex: 0,
        }}
      />

      <Container className="relative z-10 flex flex-1 flex-col justify-between py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36">
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-4xl space-y-2 sm:space-y-3">
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-cyan-600 sm:text-[10px] sm:tracking-[0.35em]">
              Intellect Studio / Digital Systems
            </p>
            <h1 className="font-sans text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-slate-900 sm:text-[clamp(3.25rem,9vw,7.5rem)] lg:text-[clamp(3.75rem,8vw,8.5rem)]">
              INTELLECT
            </h1>
            <h2 className="font-sans text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-cyan-600 sm:text-[clamp(3.25rem,9vw,7.5rem)] lg:text-[clamp(3.75rem,8vw,8.5rem)]">
              STUDIO
            </h2>
          </div>

          <div className="mt-8 max-w-2xl space-y-5 sm:mt-10">
            <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base lg:max-w-2xl">
              We design, build, and launch digital experiences that feel precise, calm, and unmistakably modern.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Button as="a" href="mailto:hello@intellectstudio.com" variant="secondary" size="md" magnetic>
                Email Us
              </Button>
              <Button as="a" href="#contact" variant="secondary" size="md" magnetic>
                Get Started
              </Button>
              <Link
                href="/teams"
                className="inline-flex items-center justify-center rounded-none bg-cyan-600 px-6 py-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2"
              >
                Teams
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-3 sm:mt-16">
          <div className="h-px w-8 bg-slate-300" />
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 sm:text-[10px]">
            Scroll to explore
          </span>
        </div>
      </Container>
    </section>
  );
}

