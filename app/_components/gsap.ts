"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText);

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The loader fires this once the curtain has lifted; late subscribers run immediately.
export function onReady(fn: () => void) {
  if (window.__kkReady) {
    fn();
    return () => {};
  }
  window.addEventListener("kk:ready", fn, { once: true });
  return () => window.removeEventListener("kk:ready", fn);
}

export { gsap, ScrollTrigger, SplitText };
