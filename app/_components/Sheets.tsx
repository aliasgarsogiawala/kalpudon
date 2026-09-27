"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "./gsap";

// Stacking (follow.art): each [data-sheet] sticks once its foot reaches the bottom of the screen, and
//    the next one slides up over it — tilted, settling flat as it arrives. ScrollTrigger measures with
//    the sheets back in normal flow, so every trigger (and every anchor link) sees its true position.
export default function Sheets() {
  useEffect(() => {
    const sheets = [...document.querySelectorAll<HTMLElement>("[data-sheet]")];

    const measure = () => sheets.forEach((s) => s.style.setProperty("--h", `${s.offsetHeight}px`));
    const ro = new ResizeObserver(measure);
    sheets.forEach((s) => ro.observe(s));
    measure();

    const unstick = () => {
      sheets.forEach((s) => s.classList.remove("is-sheet"));
      sheets.forEach((s) => (s.dataset.top = String(Math.round(s.getBoundingClientRect().top + window.scrollY))));
    };
    const stick = () => sheets.forEach((s) => s.classList.add("is-sheet"));
    unstick();
    stick();
    ScrollTrigger.addEventListener("refreshInit", unstick);
    ScrollTrigger.addEventListener("refresh", stick);

    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      sheets.slice(1).forEach((s) => {
        gsap.set(s, { transformOrigin: "0% 0%" });
        gsap.fromTo(
          s,
          { rotate: () => (window.innerWidth < 768 ? 2.5 : 4) },
          {
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: s,
              start: "top bottom",
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
              onToggle: (self) => (s.style.willChange = self.isActive ? "transform" : ""),
            },
          },
        );
      });
    });

    return () => {
      ro.disconnect();
      ScrollTrigger.removeEventListener("refreshInit", unstick);
      ScrollTrigger.removeEventListener("refresh", stick);
      ctx.revert();
      sheets.forEach((s) => {
        s.classList.remove("is-sheet");
        s.style.removeProperty("--h");
        s.style.willChange = "";
      });
    };
  }, []);

  return null;
}
