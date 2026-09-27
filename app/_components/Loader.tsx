"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "./gsap";

// No splash: the page opens the way a film does — up from black — while the hero's own
// entrance plays underneath. Nothing to read, nothing to wait for.
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    window.__kkReady = true;
    window.__lenis?.start();
    window.dispatchEvent(new Event("kk:ready"));
    ScrollTrigger.refresh();

    if (reducedMotion()) {
      requestAnimationFrame(() => setGone(true));
      return;
    }
    const tween = gsap.to(root.current, {
      opacity: 0,
      duration: 1.4,
      delay: 0.1,
      ease: "power2.inOut",
      onComplete: () => setGone(true),
    });
    return () => {
      tween.kill();
    };
  }, []);

  if (gone) return null;

  return <div ref={root} className="loader pointer-events-none fixed inset-0 z-[100] bg-ink" aria-hidden />;
}
