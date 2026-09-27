"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, SplitText, onReady, reducedMotion } from "./gsap";
import Giant, { fitGiants } from "./Giant";
import Sheet, { WRAP } from "./Sheet";
import { DOORS, doorHref } from "./data";

// Brief §3: every audience reaches its door from the first screen. General visitors go to the ideas (the hub).
const ROUTES = [
  ...DOORS.slice(0, 4).map((d) => ({ href: doorHref(d), label: d.slug === "press" ? "Press & media kit" : d.label, who: d.who })),
  { href: "/ideas", label: "The ideas", who: "Essays, talks & principles" },
];

// Brief §5.1: one calm, cinematic frame and one line. The frame is the Pantheon in Rome — wide, not tall,
// and still standing — so a stranger's first thought is "this is not who I expected".
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current!.closest("section")!;
    const q = gsap.utils.selector(section);

    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      // A slow drift inward; the line lifts away as the next sheet arrives.
      gsap.fromTo(q(".hero-still"), { scale: 1.12 }, { scale: 1.02, duration: 18, ease: "sine.out" });
      gsap
        .timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } })
        .to(q(".hero-frame"), { yPercent: 12, ease: "none" }, 0)
        .to(q(".hero-copy"), { yPercent: -18, opacity: 0.2, ease: "none" }, 0);
    }, section);

    let split: SplitText | undefined;
    const intro = gsap.context(() => {}, section);
    let cancelled = false;
    const off = onReady(() =>
      document.fonts.ready.then(() => {
        if (cancelled) return;
        fitGiants(section);
        intro.add(() => {
          gsap.set(q(".hero-intro"), { opacity: 1 });
          if (reducedMotion()) return;
          split = SplitText.create(q(".hero-name .giant-in"), { type: "lines,chars", mask: "lines", linesClass: "line" });
          gsap
            .timeline()
            .from(split.chars, { yPercent: 108, duration: 2, stagger: 0.03, ease: "expo.out" }, 0.3)
            .from(q(".hero-fade"), { y: 18, opacity: 0, duration: 1.6, stagger: 0.12, ease: "power3.out" }, 1);
        });
        ScrollTrigger.refresh();
      }),
    );

    return () => {
      cancelled = true;
      off();
      intro.revert();
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <Sheet id="top" theme="dark" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      <div ref={root} className="absolute inset-0">
        <div className="hero-frame absolute inset-0">
          <div className="hero-still absolute inset-0">
            <Image
              src="/img/pantheon.jpg"
              alt="The coffered dome of the Pantheon in Rome, seen from below"
              fill
              preload
              sizes="100vw"
              className="object-cover object-[50%_40%] brightness-[.55] saturate-[.8]"
            />
          </div>
        </div>
        {/* Black and purple falling across the frame, gold catching the light at the oculus */}
        <div className="absolute inset-0 bg-[radial-gradient(40%_35%_at_50%_30%,rgb(201_166_107/.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-[rgb(28_16_39/0.35)] to-ink" />
        <div className="grain absolute inset-0" />
      </div>

      <div className={`${WRAP} hero-intro relative flex h-full flex-col pb-6 pt-[120px] opacity-0 md:pb-10 md:pt-[160px] short:pt-[112px]`}>
        <div className="hero-copy my-auto max-w-[1100px]">
          <h1 className="hero-fade eyebrow text-gold">Kalpesh Kinariwala</h1>
          <p className="hero-name mt-6 text-bone" aria-label="Widest, not the tallest.">
            <Giant as="span" n={16} max={17} stretch={1.25} stretchSm={1.4} lines={2}>
              Widest,
              <br />
              not the tallest.
            </Giant>
          </p>
        </div>

        {/* The five doors, inside the first screen */}
        <nav aria-label="Find your door" className="hero-fade">
          <p className="eyebrow text-stone">I’m here for</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {ROUTES.map((r, i) => (
              <li key={r.href} className={i === 4 ? "col-span-2 sm:col-span-1" : ""}>
                <Link
                  href={r.href}
                  className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 backdrop-blur-md transition-colors duration-300 hover:border-gold/60 hover:bg-gold/10"
                >
                  <span>
                    <span className="block text-[15px] leading-tight text-bone md:text-[16px]">{r.label}</span>
                    <span className="mt-0.5 hidden text-[12px] leading-snug text-stone md:block">{r.who}</span>
                  </span>
                  <span aria-hidden className="text-gold transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Sheet>
  );
}
