"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, reducedMotion } from "./gsap";
import Link from "next/link";
import { HOP_FACTS, PANTHEON_NOW, PRODUCTIONS } from "./data";

const NAMES = ["Arijit Singh", "A.R. Rahman", "Rishab Sharma", "Etihad Arena", "Sold out"];
const LINES = ["Abu Dhabi", "Shows of India 2026", "GCC", "South Asian diaspora", "Arena scale", "Co-productions"];

function Rule() {
  return <span aria-hidden className="mx-[0.45em] inline-block h-[0.55em] w-px bg-bone/30 align-[0.08em]" />;
}

export default function Hop() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const section = root.current!;
    const q = gsap.utils.selector(section);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Two slow, steady marquees running in opposite directions.
      q(".marquee-track").forEach((el, i) =>
        gsap.fromTo(el, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: i % 2 ? 80 : 60, ease: "none", repeat: -1 }),
      );
    }, section);

    // The filmstrip drifts sideways as the section passes — no pin, no spin.
    mm.add("(min-width: 768px)", () => {
      const strip = q(".film-strip")[0] as HTMLElement;
      gsap.fromTo(
        strip,
        { x: 0 },
        {
          x: () => -(strip.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: { trigger: q(".film")[0], start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true },
        },
      );
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section id="hop" ref={root} className="relative bg-obsidian text-bone">
      {/* Opening frame */}
      <div className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div data-parallax="0.8" className="absolute inset-x-0 -inset-y-[12%]">
          <Image
            src="/img/stage-gold.jpg"
            alt="A raised hand silhouetted against golden stage lights"
            fill
            sizes="100vw"
            className="object-cover object-[50%_30%]"
          />
        </div>
        <div className="absolute inset-0 bg-obsidian/55" />
        <div className="absolute inset-0 bg-violet-deep/30 mix-blend-multiply" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-1 flex-col px-5 pb-16 pt-28 md:px-10 md:pt-28">
          <div data-fade className="flex flex-wrap items-center gap-3">
            <span className="bg-champagne px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-obsidian">
              What he is building now
            </span>
            <span className="text-[15px] text-bone/80">Pantheon · HOP Events</span>
          </div>

          <div className="mt-auto grid items-end gap-10 lg:grid-cols-12">
            <h2 data-split className="display text-[clamp(46px,7.8vw,150px)] lg:col-span-8">
              The present <em className="text-champagne">tense.</em>
            </h2>
            <p data-fade className="max-w-[420px] text-[17px] leading-[1.6] text-bone/80 lg:col-span-4 lg:pb-6">
              Live entertainment is the most fragmented market he has entered. HOP puts artists, promoters, venues and
              audiences in the same room — on a network and a production record built show by show.
            </p>
          </div>

          {/* Pantheon today, live events leading */}
          <ul data-fade className="mt-12 grid grid-cols-2 border-t border-white/20 md:grid-cols-4">
            {PANTHEON_NOW.map((p) => (
              <li key={p.name} className={`py-5 pr-4 md:py-6 ${p.lead ? "text-bone" : "text-bone/55"}`}>
                <p className="display-sm text-[clamp(23px,2.2vw,36px)]">
                  {p.name}
                  {p.lead && (
                    <span className="ml-3 align-middle text-[12px] font-semibold uppercase tracking-[0.14em] text-champagne">
                      Leading
                    </span>
                  )}
                </p>
                {p.what && <p className="mt-1 text-[15px]">{p.what}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Names on the marquee */}
      <div className="marquee-band overflow-hidden bg-violet-deep py-8 md:py-12">
        <div className="whitespace-nowrap">
          <div className="marquee-track display inline-block text-[clamp(38px,5.4vw,101px)] leading-[1.05] text-bone">
            {[0, 1].map((k) => (
              <span key={k}>
                {NAMES.map((n) => (
                  <span key={n}>
                    {n}
                    <Rule />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 whitespace-nowrap md:mt-6">
          <div className="marquee-track label inline-block text-[15px] text-champagne md:text-[17px]">
            {[0, 1, 2, 3].map((k) => (
              <span key={k}>
                {LINES.map((n) => (
                  <span key={n} className="mx-6">
                    {n} <span className="ml-6 opacity-50">/</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* In his words + the record */}
      <div className="mx-auto grid max-w-[1680px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12">
        <figure className="lg:col-span-7">
          <blockquote data-scrub-words className="display-sm text-[clamp(26px,2.8vw,50px)] leading-[1.1]">
            “India is producing some of the most streamed, most loved, and most culturally significant artists on the
            planet.”
          </blockquote>
          <figcaption data-fade className="mt-8 flex items-center gap-4 text-[15px] text-ash">
            <span className="h-px w-10 bg-champagne" /> Kalpesh Kinariwala, on HOP at Shows of India 2026
          </figcaption>
        </figure>
        <dl className="lg:col-span-4 lg:col-start-9">
          {HOP_FACTS.map((f) => (
            <div key={f.k} data-fade className="border-t border-white/15 py-7 first:pt-7">
              <dt className="display text-[clamp(30px,2.7vw,45px)] text-champagne">{f.k}</dt>
              <dd className="mt-2 text-[17px] text-bone">{f.v}</dd>
              <dd className="mt-1 text-[15px] text-ash">{f.d}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Filmstrip of productions */}
      <div className="film overflow-hidden pb-16 md:pb-24">
        <div className="mx-auto flex max-w-[1680px] items-end justify-between gap-6 px-5 md:px-10">
          <h3 data-split className="display text-[clamp(27px,3.1vw,57px)]">
            From one room <em className="text-champagne">to an arena.</em>
          </h3>
          <p data-fade className="hidden max-w-[260px] pb-2 text-right text-[15px] leading-relaxed text-ash md:block">
            Produced end to end.
          </p>
        </div>
        <div className="mt-12 overflow-x-auto [scrollbar-width:none] md:overflow-visible">
          <ul className="film-strip flex w-max snap-x snap-mandatory gap-5 px-5 md:gap-8 md:px-10">
            {PRODUCTIONS.map((p, i) => (
              <li key={p.t} className="snap-start">
                <figure>
                  <div
                    data-reveal={Math.min(i, 3) * 0.1}
                    data-reveal-clip
                    className={`relative h-[40svh] max-h-[460px] min-h-[260px] overflow-hidden bg-carbon md:h-[46svh] ${
                      p.w === "wide" ? "aspect-[3/2]" : "aspect-[3/4]"
                    }`}
                  >
                    <Image src={p.img} alt="" fill sizes="(min-width:768px) 45vw, 85vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-4 border-t border-white/15 pt-3 text-[15px] text-bone/80">{p.t}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Partner path */}
      <div className="mx-auto max-w-[1680px] px-5 pb-16 md:px-10 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p data-fade className="label text-champagne">
              Partner with HOP
            </p>
            <p data-fade className="mt-5 max-w-[340px] text-[17px] leading-[1.6] text-ash">
              Bring a voice, a tour or a room. Every conversation goes straight to the HOP desk.
            </p>
          </div>
          <ul className="lg:col-span-8">
            {["Artists & management", "Promoters", "Venue heads"].map((who) => (
              <li key={who} className="border-t border-white/15 last:border-b">
                <Link
                  href="/contact/hop"
                  className="group relative flex items-center justify-between overflow-hidden py-7 md:py-9"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
                  <span className="display relative text-[clamp(26px,3.1vw,57px)] transition-[color,transform] duration-700 group-hover:translate-x-6 group-hover:text-obsidian">
                    {who}
                  </span>
                  <span className="display-sm relative mr-6 text-[32px] text-champagne transition-colors duration-700 group-hover:text-obsidian">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
