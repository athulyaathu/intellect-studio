"use client";

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const TYPEWRITER_LINES = ['CREATE.', 'DESIGN.', 'LAUNCH.'];

function PortalTypewriter() {
  const [text, setText] = useState('');
  const timer = useRef(null);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let phase   = 'typing';

    const tick = () => {
      const line = TYPEWRITER_LINES[lineIdx];
      if (phase === 'typing') {
        charIdx++;
        setText(line.slice(0, charIdx));
        if (charIdx >= line.length) {
          phase = 'holding';
          timer.current = setTimeout(() => { phase = 'clearing'; tick(); }, 500);
          return;
        }
      } else if (phase === 'clearing') {
        charIdx--;
        setText(line.slice(0, charIdx));
        if (charIdx <= 0) {
          lineIdx = (lineIdx + 1) % TYPEWRITER_LINES.length;
          charIdx = 0;
          phase   = 'typing';
          if (lineIdx === 0) { timer.current = setTimeout(tick, 3000); return; }
        }
      }
      timer.current = setTimeout(tick, 80);
    };

    tick();
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700, fontSize: '14px',
      letterSpacing: '0.25em', textTransform: 'uppercase', color: '#f4f4f5',
    }}>
      {text}
      <span className="cursor-blink" style={{ marginLeft: '2px' }}>█</span>
    </span>
  );
}

export default function VRPortal() {
  const overlayRef     = useRef(null);
  const maskImgRef     = useRef(null);
  const heroPreviewRef = useRef(null);
  const heroTextRef    = useRef(null);
  const studioTextRef  = useRef(null);
  const brandRef       = useRef(null);
  const typeUIRef      = useRef(null);

  useEffect(() => {
    const preview = heroPreviewRef.current;
    const overlay = overlayRef.current;
    const brand = brandRef.current;
    const typeUI = typeUIRef.current;

    if (!preview || !overlay) return;

    gsap.set([preview, overlay, brand, typeUI], { autoAlpha: 1 });

    if (maskImgRef.current) {
      gsap.fromTo(maskImgRef.current,
        { scale: 0.96, opacity: 0.75 },
        { scale: 1, opacity: 1, duration: 1.05, ease: 'power3.out' });
    }

    if (heroTextRef.current) {
      gsap.fromTo(heroTextRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' });
    }

    if (studioTextRef.current) {
      gsap.fromTo(studioTextRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.08 });
    }

    if (brand && typeUI) {
      gsap.fromTo([brand, typeUI],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.15 });

      gsap.to([brand, typeUI], {
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power2.out',
        delay: 1.2,
      });
    }

    gsap.to([preview, overlay], {
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power2.out',
      delay: 1.2,
    });
  }, []);

  return (
    <>
      {/* LAYER 0 — hero preview */}
      <div ref={heroPreviewRef} style={{
        position: 'fixed', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: '#FDFBF7', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.05) 0%, transparent 70%)',
        }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
          <h1 ref={heroTextRef} style={{
            fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 900,
            color: '#000', lineHeight: 1, letterSpacing: '-0.03em',
            fontSize: 'clamp(4rem, 14vw, 14rem)', margin: 0, willChange: 'transform',
          }}>
            INTELLECT
          </h1>
          <h2 ref={studioTextRef} style={{
            fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 900,
            color: '#9CA3AF', lineHeight: 1, letterSpacing: '-0.03em',
            fontSize: 'clamp(4rem, 14vw, 14rem)', margin: 0, marginTop: '-0.06em', willChange: 'transform',
          }}>
            STUDIO
          </h2>
        </div>
      </div>

      {/* LAYER 1 — VR mask */}
      <div ref={overlayRef} style={{
        position: 'fixed', inset: 0, zIndex: 20, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <img
          ref={maskImgRef}
          src="/vr-mask.png"
          alt=""
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            willChange: 'transform', transformOrigin: '50% 50%',
            mixBlendMode: 'multiply',
          }}
          onError={(e) => {
            if (e.currentTarget.parentElement)
              e.currentTarget.parentElement.style.display = 'none';
          }}
        />
      </div>

      {/* LAYER 2 — brand tag */}
      <div ref={brandRef} style={{
        position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 30,
        pointerEvents: 'none', userSelect: 'none',
      }}>
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700,
          fontSize: '13px', letterSpacing: '0.25em', color: '#fff',
          textTransform: 'uppercase', margin: 0,
          textShadow: '0 1px 10px rgba(0,0,0,0.6)',
        }}>
          INTELLECT STUDIO
        </p>
      </div>

      {/* LAYER 2 — typewriter */}
      <div ref={typeUIRef} style={{
        position: 'fixed', top: '25vh', left: '8vw', zIndex: 30,
        maxWidth: '320px', pointerEvents: 'none', userSelect: 'none',
        textShadow: '0 1px 10px rgba(0,0,0,0.6)',
      }}>
        <PortalTypewriter />
      </div>
    </>
  );
}
