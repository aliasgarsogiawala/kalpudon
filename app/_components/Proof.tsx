"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, reducedMotion } from "./gsap";
import { CHAPTERS, type Chapter } from "./data";
import Crop from "./Crop";

type Tone = { bg: string; text: string; sub: string; word: string; rule: string; accent: string; crop: string };
const SURFACE: Record<Chapter["surface"], Tone> = {
  violet: { bg: "bg-violet", text: "text-bone", sub: "text-bone/65", word: "text-champagne", rule: "border-white/15", accent: "text-champagne", crop: "bg-champagne/70" },
  gold: { bg: "bg-champagne", text: "text-obsidian", sub: "text-obsidian/70", word: "text-obsidian", rule: "border-obsidian/20", accent: "text-violet-deep", crop: "bg-obsidian/60" },
  bone: { bg: "bg-obsidian", text: "text-bone", sub: "text-bone/70", word: "text-champagne", rule: "border-white/15", accent: "text-champagne", crop: "bg-champagne/70" },
  stage: { bg: "bg-violet-deep", text: "text-bone", sub: "text-bone/70", word: "text-champagne", rule: "border-white/15", accent: "text-champagne", crop: "bg-champagne/70" },
};

const MOVE_LABELS = ["Fragmentation", "Downside", "Scale"];

function Panel({ c }: { c: Chapter }) {
  const s = SURFACE[c.surface];
  return (
    <article
      className={`proof-panel relative flex min-h-[100svh] w-full shrink-0 overflow-hidden lg:h-[100svh] lg:w-[100vw] ${s.bg} ${s.text}`}
    >
      <div className="mx-auto grid w-full max-w-[1680px] gap-10 px-5 pb-16 pt-24 md:px-10 lg:grid-cols-12 lg:gap-12 lg:pb-12 lg:pt-[128px] short:pt-[104px] short:pb-8">
        {/* Arch photograph */}
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-[520px] lg:aspect-auto lg:h-[calc(100svh-200px)] lg:max-w-none short:h-[calc(100svh-160px)]">
            <div className="absolute inset-0 overflow-hidden">
              <div className="proof-img absolute -inset-x-[14%] inset-y-0">
                <Image src={c.img} alt={c.alt} fill sizes="(min-width:1024px) 42vw, 90vw" className="object-cover" />
              </div>
            </div>
            <Crop tone={s.crop} />
            <p className="label absolute -bottom-8 left-0 text-[11px] opacity-60">
              Fig. {c.n} — {c.word}
            </p>
          </div>
        </div>

        {/* Narrative */}
        <div className="flex flex-col lg:col-span-7">
          <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-5 ${s.rule}`}>
            <p className="label flex items-center gap-3">
              <span className="display-sm text-[22px] normal-case tracking-normal">{c.n}</span>
              {c.sector}
            </p>
            <p className="label opacity-70">
              {c.entity} · {c.since}
            </p>
          </div>

          <p className={`proof-word display mt-8 text-[clamp(50px,7.2vw,132px)] leading-[0.82] short:mt-5 short:text-[clamp(43px,10.2svh,90px)] ${s.word}`}>{c.word}</p>

          <h3 className="display-sm mt-8 max-w-[18ch] text-[clamp(23px,2.3vw,41px)] leading-[1.06] short:mt-4 short:text-[clamp(23px,4.1svh,36px)]">{c.headline}</h3>
          <p className={`mt-5 max-w-[46ch] text-[17px] leading-[1.6] short:mt-3 short:text-[16px] ${s.sub}`}>{c.proof}</p>

          <ol className={`mt-auto grid gap-6 border-t pt-7 sm:grid-cols-3 lg:mt-10 short:mt-auto short:pt-5 ${s.rule}`}>
            {c.moves.map((m, i) => (
              <li key={i}>
                <p className={`display-sm text-[15px] ${s.accent}`}>
                  {i + 1} — {MOVE_LABELS[i]}
                </p>
                <p className={`mt-2 text-[15px] leading-[1.55] ${s.sub}`}>{m}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

export default function Proof() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const section = root.current!;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const q = gsap.utils.selector(section);
      const distance = () => track.current!.scrollWidth - window.innerWidth;

      const slide = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(q(".proof-progress"), { scaleX: self.progress }),
        },
      });

      // Depth inside each panel: photo drifts against the scroll, the big word drifts with it.
      q(".proof-panel").forEach((panel) => {
        const img = panel.querySelector(".proof-img");
        const word = panel.querySelector(".proof-word");
        gsap.fromTo(img, { xPercent: -9 }, { xPercent: 9, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left right", end: "right left", scrub: true } });
        gsap.fromTo(word, { xPercent: 18 }, { xPercent: -8, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left right", end: "right left", scrub: true } });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="proof" ref={root} className="relative overflow-hidden bg-obsidian">
      <div ref={track} className="flex flex-col lg:w-max lg:flex-row">
        {/* Opening panel */}
        <div className="grain relative flex min-h-[80svh] w-full shrink-0 flex-col justify-between overflow-hidden px-5 pb-12 pt-24 md:px-10 lg:h-[100svh] lg:w-[64vw] lg:pb-14 lg:pt-[140px]">
          <p data-fade className="label relative text-ash">
            The proof
          </p>
          <div className="relative">
            <h2 data-split className="display text-[clamp(36px,5vw,94px)]">
              The same move, <em className="text-champagne">four times.</em>
            </h2>
            <p data-fade className="mt-8 max-w-[520px] text-[17px] leading-[1.6] text-bone/70">
              Not a portfolio. One instinct — find the fragmentation, engineer the downside, let scale follow — run
              through four industries that shared nothing but the shape of their problem.
            </p>
          </div>
          <p data-fade className="relative hidden items-center gap-4 text-[15px] text-ash lg:flex">
            Keep scrolling <span className="h-px w-16 bg-champagne" />
          </p>
        </div>

        {CHAPTERS.map((c) => (
          <Panel key={c.n} c={c} />
        ))}
      </div>

      {/* Chapter rail */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden lg:block">
        <div className="h-[3px] w-full bg-white/10">
          <div className="proof-progress h-full origin-left scale-x-0 bg-champagne" />
        </div>
      </div>
    </section>
  );
}
