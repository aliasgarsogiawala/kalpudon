"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, reducedMotion } from "./gsap";
import Giant from "./Giant";
import LiveVideo from "./LiveVideo";
import Sheet, { Split, WRAP, WashLayer } from "./Sheet";
import { HOP_FACTS, PANTHEON_NOW, PRODUCTIONS } from "./data";

const NAMES = ["Arijit Singh", "A.R. Rahman", "Rishab Sharma", "Etihad Arena", "Sold out"];

// Mosaic slots for the four production stills, in PRODUCTIONS order: one tall frame beside three.
const SLOTS = [
  "row-span-2 md:col-span-5 md:row-span-2",
  "aspect-[4/5] md:col-span-7 md:aspect-auto",
  "aspect-[4/5] md:col-span-4 md:aspect-auto",
  "col-span-2 aspect-[16/9] md:col-span-3 md:aspect-auto",
];


// Brief §5.4: what he is building now — Pantheon as Art, Culture, Real Estate and HOP, with live events
// leading. Present tense, and the sheet that should feel the most alive: crowd footage, motion, energy.
export default function Hop() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context((self) => {
      const track = self.selector!(".marquee-track")[0];
      gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: 60, ease: "none", repeat: -1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Sheet id="hop" theme="dark" className="bg-ink text-bone">
      <div ref={root}>
        {/* Opening: the room itself, one full screen. The thesis's shape, mirrored: the heading across the
            top, the statement and what Pantheon is building on the left, him in the arena on the right. */}
        <div className="relative overflow-hidden">
          <LiveVideo src="/video/hop-live.mp4" poster="/video/hop-live.jpg" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-violet/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/75" />

          <div className={`${WRAP} relative z-[1] flex flex-col pb-20 pt-[132px] md:pb-28 md:pt-[180px] lg:h-[100svh] lg:min-h-[680px] lg:pb-[6svh] lg:pt-[max(100px,13svh)]`}>
            <Giant as="h2" n={14} max={16}>
              <span className="accent mr-[0.4em]">the</span>Present tense
            </Giant>

            <div className="mt-14 flex flex-col gap-14 lg:mt-[6svh] lg:min-h-0 lg:flex-1 lg:flex-row lg:gap-[6vw]">
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-12 lg:py-[1svh]">
                <p data-fade className="t-lead max-w-[40ch] text-bone">
                  Pantheon is what he is building now: art, culture, real estate — and HOP, which leads it. Live
                  entertainment is the most fragmented market he has entered. HOP puts artists, promoters, venues and
                  audiences in the same room, on a network and a production record built show by show.
                </p>
                <ul data-fade className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-6 sm:grid-cols-4">
                  {PANTHEON_NOW.map((p) => (
                    <li key={p.name} className={p.lead ? "text-bone" : "text-bone/55"}>
                      <p className="t-title">{p.name}</p>
                      {p.lead && <p className="t-note mt-1 text-gold-soft">Leading</p>}
                      {p.what && <p className="t-note mt-1">{p.what}</p>}
                    </li>
                  ))}
                </ul>
              </div>

              <figure data-fade className="mx-auto w-[78%] max-w-[420px] lg:mx-0 lg:aspect-[4/5] lg:h-full lg:w-auto lg:max-w-none lg:shrink-0">
                <div className="relative aspect-[4/5] rotate-[2deg] overflow-hidden bg-coal shadow-[0_50px_100px_-30px_rgba(0,0,0,.85)] lg:aspect-auto lg:h-full">
                  <Image
                    src="/img/kk-arena-watch.jpg"
                    alt="Kalpesh Kinariwala watching the show from the floor of the arena"
                    fill
                    sizes="(min-width:1024px) 40svh, 78vw"
                    className="object-cover object-[50%_50%]"
                  />
                </div>
              </figure>
            </div>
          </div>
        </div>

        {/* The names on the marquee */}
        <div aria-label={NAMES.join(", ")} role="img" className="overflow-hidden bg-coal py-10 md:py-16">
          <div className="whitespace-nowrap">
            <div className={`marquee-track inline-block text-[clamp(56px,7vw,130px)] leading-[0.9] text-bone display`}>
              {[0, 1].map((k) => (
                <span key={k} aria-hidden>
                  {NAMES.map((n) => (
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

        <div className="relative">
          <WashLayer wash="ink" />
          {/* In his words, and the record: one screen */}
          <div className={`${WRAP} flex min-h-[100svh] items-center py-28 md:py-[10svh]`}>
            <Split
              className="w-full"
              left={
                <figure>
                  <blockquote data-scrub-words className="t-statement">
                    “India is producing some of the most streamed, most loved, and most culturally significant artists on
                    the planet.”
                  </blockquote>
                  <figcaption data-fade className="t-note mt-8 text-stone">
                    Kalpesh Kinariwala, on HOP, at Shows of India 2026
                  </figcaption>
                </figure>
              }
              right={
                <dl>
                  {HOP_FACTS.map((f, i) => (
                    <div key={f.k} data-fade className={i ? "border-t border-white/10 pt-8 mt-8" : ""}>
                      <dt className="t-statement font-bold text-gold-soft">{f.k}</dt>
                      <dd className="t-body mt-2 text-bone">{f.v}</dd>
                      <dd className="t-note mt-1 text-stone">{f.d}</dd>
                    </div>
                  ))}
                </dl>
              }
            />
          </div>

          {/* Productions, and the way in for partners: one screen */}
          <div className={`${WRAP} flex min-h-[100svh] flex-col py-28 md:pb-[6svh] md:pt-[max(100px,12svh)]`}>
            <div className="flex items-end justify-between gap-6">
              <h3 data-split className="t-statement">
                From one room <em className="text-gold-soft">to an arena.</em>
              </h3>
              <p data-fade className="t-body hidden max-w-[260px] pb-1 text-right text-stone md:block">
                Produced end to end.
              </p>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-[4svh] md:grid-cols-12 md:grid-rows-[repeat(2,clamp(170px,23svh,380px))] md:gap-5">
              {PRODUCTIONS.map((p, i) => (
                <li key={p.t} className={`${SLOTS[i]} relative`}>
                  <figure className="absolute inset-0">
                    <div data-reveal={Math.min(i, 3) * 0.1} data-reveal-clip className="absolute inset-0 overflow-hidden bg-coal">
                      <Image src={p.img} alt="" fill sizes="(min-width:768px) 50vw, 92vw" className="object-cover" />
                    </div>
                    <figcaption className="t-note absolute bottom-0 left-0 z-[3] bg-ink/75 px-3 py-1.5 text-bone/85 backdrop-blur-sm">
                      {p.t}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>

            <Link href="/contact/hop" className="group mt-16 block md:mt-auto md:pt-[5svh]">
              <span className="t-body block text-gold-soft">For artists, promoters and venues</span>
              <span className="mt-3 block transition-colors duration-500 group-hover:text-gold-soft">
                <Giant as="span" n={16} max={16}>
                  Partner with HOP
                </Giant>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
