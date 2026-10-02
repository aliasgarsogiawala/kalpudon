"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "./gsap";

// Stacking (follow.art): each [data-sheet] sticks once its foot reaches the bottom of the screen, and
//    the next one slides up over it. Only the arriving sheet's top edge runs at a slant, flattening as it
//    lands; the type on it stays level. The sheet it covers drifts up a little and falls into shadow, so
//    the move reads as depth. ScrollTrigger measures with the sheets back in normal flow, so every trigger
//    (and every anchor link) sees its true position.
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

    // globals.css turns these into the slanted edge (--slant), the drift (--drift) and the shadow (--shade).
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      sheets.slice(1).forEach((s, i) => {
        const under = sheets[i];
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: s,
              start: "top bottom",
              end: "top top",
              scrub: true,
              onToggle: (self) => [s, under].forEach((el) => (el.style.willChange = self.isActive ? "transform, clip-path" : "")),
            },
          })
          .fromTo(s, { "--slant": 1 }, { "--slant": 0 }, 0)
          .fromTo(under, { "--shade": 0 }, { "--shade": 1 }, 0)
          // Slow at first, so the covered sheet never lifts clear of the slanted edge coming up under it.
          .fromTo(under, { "--drift": 0 }, { "--drift": 1, ease: "power2.in" }, 0);
      });
    });

    return () => {
      ro.disconnect();
      ScrollTrigger.removeEventListener("refreshInit", unstick);
      ScrollTrigger.removeEventListener("refresh", stick);
      ctx.revert();
      sheets.forEach((s) => {
        s.classList.remove("is-sheet");
        ["--h", "--slant", "--shade", "--drift"].forEach((p) => s.style.removeProperty(p));
        s.style.willChange = "";
      });
    };
  }, []);

  return null;
}
