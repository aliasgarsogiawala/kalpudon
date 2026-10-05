"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "./gsap";

// Names running across the screen in display type, gold dots between them (the HOP artists' marquee).
export default function Marquee({ names }: { names: readonly string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const tween = gsap.fromTo(track.current, { xPercent: 0 }, { xPercent: -50, duration: 60, ease: "none", repeat: -1 });
    return () => void tween.kill();
  }, []);

  return (
    <div aria-label={names.join(", ")} role="img" className="overflow-hidden bg-coal py-10 md:py-16">
      <div className="whitespace-nowrap">
        <div ref={track} className="inline-block text-[clamp(56px,7vw,130px)] leading-[0.9] text-bone display">
          {[0, 1].map((k) => (
            <span key={k} aria-hidden>
              {names.map((n) => (
                <span key={n}>
                  {n}
                  <span className="mx-[0.3em] inline-block size-[0.12em] -translate-y-[0.28em] rounded-full bg-gold align-middle" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
