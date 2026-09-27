"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "./gsap";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | undefined;
    const tick = (t: number) => lenis?.raf(t * 1000);

    if (!reducedMotion()) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (!window.__kkReady) lenis.stop();
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!;
      const el = hash === "#top" ? document.body : document.querySelector<HTMLElement>(hash);
      if (!el) return;
      e.preventDefault();
      // A stuck sheet reports where it is pinned, not where it starts; Sheets.tsx records the start.
      const top = el.dataset.top ? Number(el.dataset.top) : el.getBoundingClientRect().top + window.scrollY;
      if (lenis) lenis.scrollTo(top, { duration: 2, easing: (t) => 1 - Math.pow(1 - t, 4) });
      else window.scrollTo({ top });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
