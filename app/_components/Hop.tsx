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

const condensed = "font-black uppercase tracking-[-0.01em] [font-stretch:62%]";

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
        {/* Opening: the room itself */}
        <div className="relative overflow-hidden">
          <LiveVideo src="/video/hop-live.mp4" poster="/video/hop-live.jpg" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-ink/50" />
          <div className="absolute inset-0 bg-violet/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/70" />

          <div className={`${WRAP} relative z-[1] flex min-h-[100svh] flex-col pb-20 pt-[132px] md:pb-28 md:pt-[200px]`}>
            {/* Him, at the centre of it: on stage at Shows of India. The giant words cross the podium, never his face. */}
            <figure data-fade className="relative mx-auto w-[72%] max-w-[340px] rotate-[2deg] md:mr-[3%] md:mt-auto md:w-[clamp(240px,25vw,420px)] md:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden bg-coal shadow-[0_50px_100px_-30px_rgba(0,0,0,.85)]">
                <Image
                  src="/img/ig-podium-2.jpg"
                  alt="Kalpesh Kinariwala on stage at Shows of India 2026"
                  fill
                  sizes="(min-width:768px) 26vw, 72vw"
                  className="object-cover object-[50%_22%]"
                />
              </div>
            </figure>

            <h2 aria-label="The present tense" className="relative z-[2] mt-10 md:-mt-[12vw]">
              <span aria-hidden className="script script-outline absolute left-[0.5%] top-[4%] z-[2] -rotate-[8deg] text-[clamp(36px,7vw,132px)] text-gold-soft">
                the
              </span>
              <Giant as="span" n={13} max={26} stretch={1.3} stretchSm={1.6}>
                Present tense
              </Giant>
            </h2>

            <Split
              className="mt-20 md:mt-32"
              left={
                <p data-fade className="max-w-[44ch] text-[18px] leading-[1.65] text-bone/85">
                  Pantheon is what he is building now: art, culture, real estate — and HOP, which leads it. Live
                  entertainment is the most fragmented market he has entered. HOP puts artists, promoters, venues and
                  audiences in the same room, on a network and a production record built show by show.
                </p>
              }
              right={
                <ul data-fade className="grid grid-cols-2 gap-y-8">
                  {PANTHEON_NOW.map((p) => (
                    <li key={p.name} className={`pr-4 ${p.lead ? "text-bone" : "text-bone/55"}`}>
                      <p className={`text-[clamp(30px,2.6vw,44px)] leading-none ${condensed}`}>
                        {p.name}
                        {p.lead && <span className="eyebrow ml-3 align-middle text-[10px] tracking-[0.18em] text-gold [font-stretch:110%]">Leading</span>}
                      </p>
                      {p.what && <p className="mt-2 text-[14px]">{p.what}</p>}
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
        </div>

        {/* The names on the marquee */}
        <div aria-label={NAMES.join(", ")} role="img" className="overflow-hidden bg-coal py-10 md:py-16">
          <div className="whitespace-nowrap">
            <div className={`marquee-track inline-block text-[clamp(56px,7vw,130px)] leading-[0.9] text-bone ${condensed}`}>
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
          <div className={`${WRAP} pb-36 pt-32 md:pb-56 md:pt-52`}>
            {/* In his words, and the record */}
            <Split
              left={
                <figure>
                  <blockquote data-scrub-words className="serif text-[clamp(30px,3vw,54px)] leading-[1.08]">
                    “India is producing some of the most streamed, most loved, and most culturally significant artists on
                    the planet.”
                  </blockquote>
                  <figcaption data-fade className="mt-8 text-[15px] text-stone">
                    Kalpesh Kinariwala, on HOP, at Shows of India 2026
                  </figcaption>
                </figure>
              }
              right={
                <dl>
                  {HOP_FACTS.map((f, i) => (
                    <div key={f.k} data-fade className={i ? "pt-10" : ""}>
                      <dt className={`text-[clamp(40px,3.6vw,64px)] leading-none text-gold-soft ${condensed}`}>{f.k}</dt>
                      <dd className="mt-3 text-[17px] text-bone">{f.v}</dd>
                      <dd className="mt-1 text-[14px] text-stone">{f.d}</dd>
                    </div>
                  ))}
                </dl>
              }
            />

            {/* Productions */}
            <div className="mt-40 flex items-end justify-between gap-6 md:mt-64">
              <h3 data-split className="serif text-[clamp(36px,4vw,72px)] leading-[0.95]">
                From one room <em className="text-gold-soft">to an arena.</em>
              </h3>
              <p data-fade className="hidden max-w-[260px] pb-2 text-right text-[15px] leading-relaxed text-stone md:block">
                Produced end to end.
              </p>
            </div>
            <ul className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-12 md:grid-rows-[repeat(2,clamp(220px,23vw,400px))] md:gap-5">
              {PRODUCTIONS.map((p, i) => (
                <li key={p.t} className={`${SLOTS[i]} relative`}>
                  <figure className="absolute inset-0">
                    <div data-reveal={Math.min(i, 3) * 0.1} data-reveal-clip className="absolute inset-0 overflow-hidden bg-coal">
                      <Image src={p.img} alt="" fill sizes="(min-width:768px) 50vw, 92vw" className="object-cover" />
                    </div>
                    <figcaption className="eyebrow absolute bottom-0 left-0 z-[3] bg-ink/75 px-3 py-2 text-[10px] text-bone/85 backdrop-blur-sm">
                      {p.t}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partner path */}
        <Link href="/contact/hop" className={`${WRAP} group block py-24 md:py-40`}>
          <span className="block text-[15px] text-gold">For artists, promoters and venues</span>
          <span className="mt-5 block transition-colors duration-500 group-hover:text-gold-soft">
            <Giant as="span" n={16} max={16}>
              Partner with HOP
            </Giant>
          </span>
        </Link>
      </div>
    </Sheet>
  );
}
