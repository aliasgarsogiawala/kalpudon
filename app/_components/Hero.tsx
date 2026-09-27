"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText, onReady, reducedMotion } from "./gsap";
import Giant, { fitGiants } from "./Giant";
import Sheet, { WRAP } from "./Sheet";

// A cover, not a landing page: the man under a spotlight, his first name set behind him like a masthead
// and his surname written across him, both in white. One line carries the positioning (brief §5.1); nothing else competes.
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current!.closest("section")!;
    const q = gsap.utils.selector(section);

    // Depth on scroll: the masthead lifts away faster than the man, who holds the frame longest.
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } })
        .to(q(".hero-mast"), { yPercent: -45, opacity: 0.15, ease: "none" }, 0)
        .to(q(".hero-figure"), { yPercent: 6, ease: "none" }, 0)
        .to(q(".hero-script, .hero-line"), { yPercent: -60, ease: "none" }, 0);
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
          split = SplitText.create(q(".hero-mast .giant-in"), { type: "chars" });
          gsap
            .timeline()
            .from(q(".hero-light"), { opacity: 0, duration: 2.2, ease: "power2.out" }, 0)
            .from(split.chars, { yPercent: 40, opacity: 0, duration: 1.4, stagger: 0.05, ease: "expo.out" }, 0.1)
            .from(q(".hero-figure-in"), { yPercent: 8, opacity: 0, duration: 1.6, ease: "expo.out" }, 0.35)
            .from(q(".hero-script"), { opacity: 0, x: -24, duration: 1.3, ease: "power3.out" }, 0.9)
            .from(q(".hero-line"), { opacity: 0, y: 14, duration: 1.2, ease: "power3.out" }, 1.15);
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
      {/* Phones stack the same cover in flow (name, the man, his surname across the jacket, the line); from
          tablets up each piece is placed over the frame. --fw keeps his shoulders inside a phone screen. */}
      <div
        ref={root}
        className="hero-intro absolute inset-0 flex flex-col pt-[92px] opacity-0 [--fw:min(108vw,480px,calc((100svh_-_250px)_*_0.787))] md:block md:pt-0"
      >
        {/* The spotlight: a beam from above and warm light pooling behind him */}
        <div aria-hidden className="hero-light absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(48%_36%_at_50%_48%,rgb(196_120_52/.34),rgb(120_34_28/.16)_48%,transparent_78%)] md:bg-[radial-gradient(30%_52%_at_50%_60%,rgb(196_120_52/.34),rgb(120_34_28/.16)_48%,transparent_78%)]" />
          <div className="absolute left-1/2 top-0 h-full w-[140%] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_-8%,transparent_164deg,rgb(239_211_148/.1)_174deg,rgb(239_211_148/.16)_180deg,rgb(239_211_148/.1)_186deg,transparent_196deg)] md:w-full" />
        </div>

        {/* The masthead, behind him */}
        <h1
          aria-label="Kalpesh Kinariwala"
          className={`hero-mast ${WRAP} relative text-white md:absolute md:inset-x-0 md:top-[104px] short:top-[92px]`}
        >
          <Giant as="span" n={7} max={40} className="text-center normal-case">
            Kalpesh
          </Giant>
        </h1>

        {/* The man, in front of it */}
        <div className="hero-figure relative mx-auto -mt-[calc(var(--fw)*0.03)] w-[var(--fw)] md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:flex md:w-auto md:justify-center">
          <div className="hero-figure-in relative aspect-[792/1006] w-full [mask-image:linear-gradient(to_bottom,#000_68%,transparent_97%)] md:aspect-auto md:h-[72svh] md:w-[calc(72svh*0.787)] md:shrink-0 md:translate-y-[9%] md:[mask-image:none]">
            <Image
              src="/img/cut-founder.png"
              alt="Kalpesh Kinariwala"
              fill
              preload
              sizes="(min-width:768px) 64svh, 100vw"
              className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,.6)]"
            />
          </div>
        </div>

        {/* His surname, written across him */}
        <p
          aria-hidden
          className="hero-script script relative z-[2] -mt-[calc(var(--fw)*0.4)] ml-6 self-start text-[clamp(52px,15vw,72px)] text-white [text-shadow:0_6px_40px_rgb(0_0_0/.55)] md:absolute md:bottom-[14%] md:left-1/2 md:ml-0 md:mt-0 md:-translate-x-[88%] md:text-[clamp(60px,8.4vw,150px)]"
        >
          Kinariwala
        </p>

        {/* The positioning, in one line */}
        <p className="hero-line serif relative z-[2] mr-6 mt-4 max-w-[11ch] self-end text-right text-[24px] leading-[1.05] text-bone md:absolute md:bottom-[17%] md:right-[max(6vw,calc(50%-600px))] md:mr-0 md:mt-0 md:text-[clamp(30px,2.6vw,46px)]">
          The widest, <em className="text-gold-soft">not the tallest.</em>
        </p>

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div aria-hidden className="grain absolute inset-0" />
      </div>
    </Sheet>
  );
}
