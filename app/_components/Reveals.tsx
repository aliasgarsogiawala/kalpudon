"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, reducedMotion } from "./gsap";
import { fitGiants } from "./Giant";

const COVER: Record<string, string> = { paper: "bg-paper", gold: "bg-gold" };

// Page-wide reveal vocabulary. Mounted last so its triggers are created after everything else.
//   data-giant        a giant word: its letters rise out of the line, one after another
//   data-split        heading lines rise out of masks
//   data-fade         soft rise + fade
//   data-card3d       a print turned in space settles flat as its section passes
//   data-parallax     element drifts against the scroll (value = strength)
//   data-scrub-words  words brighten as the reader scrolls through them
//   data-draw         a hairline draws itself as its block scrolls through ("x" across, "y" down)
//   data-count        a figure ("1,000+", "#2") counts up from zero to itself when it comes into view
//   data-cutout       a cut-out of him fades in slowly (value = delay in seconds), drifting in from the
//                     side data-cutout-x gives (xPercent, default 6)
//   data-reveal       a photograph develops: a cover lifts off its [data-reveal-clip] frame while the image
//                     settles from a slight zoom (value = delay in seconds). data-reveal-tone="paper" or
//                     "gold" matches the cover to a light sheet.
export default function Reveals() {
  useEffect(() => {
    let ctx: gsap.Context | undefined;
    const splits: SplitText[] = [];
    let cancelled = false;
    const refit = () => fitGiants();

    document.fonts.ready.then(() => {
      if (cancelled) return;
      // Giant words take their exact size before anything measures them, and again on every refresh.
      fitGiants();
      ScrollTrigger.addEventListener("refreshInit", refit);
      if (reducedMotion()) {
        ScrollTrigger.refresh();
        return;
      }

      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-giant]").forEach((el) => {
          if (el.closest("footer")) return; // the footer signature just sits
          const s = SplitText.create(el.querySelector(".giant-in")!, { type: "lines,chars", mask: "lines", linesClass: "line" });
          splits.push(s);
          gsap.from(s.chars, {
            yPercent: 108,
            duration: 1.5,
            stagger: 0.04,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

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

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          // Kept on the element, so a second run (a remount mid-count) never starts from a half-counted figure
          const final = (el.dataset.countFinal ??= el.textContent ?? "");
          const m = final.match(/\d[\d,]*/);
          if (!m) return;
          const target = Number(m[0].replace(/,/g, ""));
          const show = (n: number) => (el.textContent = final.replace(m[0], Math.round(n).toLocaleString("en-US")));
          const count = { n: 0 };
          show(0);
          gsap.to(count, {
            n: target,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => show(count.n),
            onComplete: () => void (el.textContent = final),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
          const axis = el.dataset.draw === "y" ? "scaleY" : "scaleX";
          gsap.fromTo(
            el,
            { [axis]: 0 },
            { [axis]: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 85%", end: "bottom 55%", scrub: true } },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-cutout]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            xPercent: Number(el.dataset.cutoutX ?? 6),
            duration: 2.8,
            delay: Number(el.dataset.cutout || 0),
            ease: "power2.out",
            scrollTrigger: { trigger: el.parentElement, start: "top 80%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-card3d]").forEach((el) => {
          gsap.fromTo(
            el,
            { rotationY: -26, rotationX: 12, rotation: 5, transformPerspective: 1400 },
            {
              rotationY: -5,
              rotationX: 2,
              rotation: 1,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom 30%", scrub: true },
            },
          );
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
          cover.className = `reveal-cover pointer-events-none absolute inset-0 z-[2] origin-top ${
            COVER[el.dataset.revealTone ?? ""] ?? "bg-ink"
          }`;
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
          gsap.fromTo(
            s.words,
            { opacity: 0.18 },
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
      ScrollTrigger.removeEventListener("refreshInit", refit);
      ctx?.revert();
      document.querySelectorAll(".reveal-cover").forEach((c) => c.remove());
      splits.forEach((s) => s.revert());
    };
  }, []);

  return null;
}
