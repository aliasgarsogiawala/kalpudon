"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "./gsap";

type Connection = { saveData?: boolean };

// Muted footage loop that costs nothing until it is needed (brief §8): the file is only requested when
// the frame comes near the viewport, and it pauses off-screen. Reduced motion or Save-Data keeps the still.
export default function LiveVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current!;
    const saveData = (navigator as Navigator & { connection?: Connection }).connection?.saveData;
    if (reducedMotion() || saveData) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.getAttribute("src")) v.src = src;
          v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-hidden className={className} />;
}
