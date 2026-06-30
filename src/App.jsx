"use client";

import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VRPortal from './components/VRPortal';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import PortfolioSection from './components/sections/PortfolioSection';
import MetricsSection from './components/sections/MetricsSection';
import FooterSection from './components/sections/FooterSection';

// HomePage isolates all portal + section state.
// On unmount, kill every active ScrollTrigger to prevent DOM leaks when routing away.
function HomePage() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <VRPortal />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <MetricsSection />
      <FooterSection />
    </div>
  );
}

export default HomePage;
