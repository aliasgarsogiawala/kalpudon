"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "./gsap";

// Phones can refuse to start a muted loop on their own (iPhones in Low Power Mode refuse every autoplay),
// but any touch on the page lets it play. Films that were refused wait here for that first touch.
const waiting = new Set<HTMLVideoElement>();
const GESTURES = ["touchend", "click", "keydown"] as const;

function playWaiting() {
  waiting.forEach((v) => v.play().then(() => waiting.delete(v), () => {}));
  if (!waiting.size) GESTURES.forEach((g) => window.removeEventListener(g, playWaiting));
}

function start(v: HTMLVideoElement) {
  v.muted = true; // the property, not only the attribute, is what phones check before autoplaying
  v.play().then(
    () => waiting.delete(v),
    () => {
      waiting.add(v);
      GESTURES.forEach((g) => window.addEventListener(g, playWaiting, { passive: true }));
    },
  );
}

// Muted footage loop that costs nothing until it is needed (brief §8): the file is only requested when
// the frame comes near the viewport, and it pauses off-screen. Reduced motion keeps the still.
export default function LiveVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current!;
    if (reducedMotion()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.getAttribute("src")) v.src = src;
          start(v);
        } else {
          waiting.delete(v);
          v.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      waiting.delete(v);
    };
  }, [src]);

  return <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-hidden className={className} />;
}
