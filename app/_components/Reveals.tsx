"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, reducedMotion } from "./gsap";

// Page-wide reveal vocabulary. Mounted last so its triggers are created after every pinned section.
//   data-split        heading lines rise out of masks
//   data-fade         soft rise + fade
//   data-rule         hairline draws left → right
//   data-parallax     element drifts against the scroll (value = strength)
//   data-scrub-words  words brighten as the reader scrolls through them
//   data-reveal       a photograph develops: a cover lifts off its [data-reveal-clip] frame while the image
//                     settles from a slight zoom (value = delay in seconds). A cover, not a clip-path, so
//                     lazy images still load normally underneath.
export default function Reveals() {
  useEffect(() => {
    if (reducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const splits: SplitText[] = [];
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const s = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "line" });
          splits.push(s);
          gsap.from(s.lines, {
            yPercent: 135,
            duration: 1.6,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.from(el, {
            y: 46,
            opacity: 0,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            duration: 1.8,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const k = Number(el.dataset.parallax || 1);
          gsap.fromTo(
            el,
            { yPercent: -7 * k },
            { yPercent: 7 * k, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const frame = el.hasAttribute("data-reveal-clip") ? el : el.querySelector<HTMLElement>("[data-reveal-clip]");
          if (!frame) return;
          const cover = document.createElement("span");
          cover.className = "reveal-cover pointer-events-none absolute inset-0 z-[2] origin-top bg-obsidian";
          frame.appendChild(cover);
          const img = frame.querySelector("img");
          const at = Number(el.dataset.reveal || 0);
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
          tl.fromTo(cover, { scaleY: 1 }, { scaleY: 0, duration: 1.4, ease: "expo.inOut" }, at);
          if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 2.2, ease: "expo.out" }, at + 0.15);
        });

        gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
          const s = SplitText.create(el, { type: "words" });
          splits.push(s);
          const targets = [...s.words, ...el.querySelectorAll("img")];
          gsap.fromTo(
            targets,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: true },
            },
          );
        });
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      document.querySelectorAll(".reveal-cover").forEach((c) => c.remove());
      splits.forEach((s) => s.revert());
    };
  }, []);

  return null;
}
