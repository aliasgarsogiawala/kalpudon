"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText, onReady, reducedMotion } from "./gsap";
import Crop from "./Crop";

// After the entrance, the frame turns through the four markets — one instinct, four industries.
const SLIDES = [
  { src: "/img/iodine-crystals.jpg", pos: "object-center" },
  { src: "/img/gold-leaf.jpg", pos: "object-center" },
  { src: "/img/dubai-twilight.jpg", pos: "object-[58%_50%]" },
  { src: "/img/stage-amber.jpg", pos: "object-[50%_40%]" },
];
const CAPTIONS = ["Fig. 01 — At work", "I — Iodine", "II — Private capital", "III — Real estate", "IV — Live entertainment"];
const MARKETS = [
  { n: "I", name: "Iodine", thumb: "/img/iodine-crystals.jpg" },
  { n: "II", name: "Private capital", thumb: "/img/gold-leaf.jpg" },
  { n: "III", name: "Real estate", thumb: "/img/dubai-twilight.jpg" },
  { n: "IV", name: "Live entertainment", thumb: "/img/stage-amber.jpg" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [slides, setSlides] = useState(false);

  useEffect(() => {
    const section = root.current!;
    const q = gsap.utils.selector(section);
    const media = q(".hero-media")[0] as HTMLElement;
    const frame = q(".hero-frame")[0] as HTMLElement;

    // The photograph lives in a real box (not a clip) so object-cover keeps the subject framed at every size.
    const box = () => {
      const W = section.clientWidth;
      const H = section.clientHeight;
      return W >= 1024
        ? { top: H * 0.17, right: W * 0.09, bottom: H * 0.13, left: W * 0.5 }
        : { top: H * 0.58, right: W * 0.06, bottom: H * 0.05, left: W * 0.38 };
    };
    const place = () => {
      gsap.set(frame, box());
      if (!ScrollTrigger.getById("hero")?.progress) gsap.set(media, box());
    };

    const ctx = gsap.context(() => {
      place();
      ScrollTrigger.addEventListener("refreshInit", place);

      if (!reducedMotion()) {
        const tl = gsap.timeline({
          scrollTrigger: { id: "hero", trigger: section, start: "top top", end: "+=140%", pin: true, scrub: 1, invalidateOnRefresh: true },
        });
        tl.fromTo(media, { top: () => box().top, right: () => box().right, bottom: () => box().bottom, left: () => box().left }, { top: 0, right: 0, bottom: 0, left: 0, ease: "power2.inOut", duration: 1 }, 0)
          .to(frame, { opacity: 0, duration: 0.15 }, 0)
          .to(q(".hero-copy"), { yPercent: -35, opacity: 0, ease: "power1.in", duration: 0.55 }, 0)
          .to(q(".hero-markets"), { opacity: 0, duration: 0.3 }, 0)
          .to(q(".hero-shade"), { opacity: 0.5, duration: 1, ease: "none" }, 0)
          .to(q(".hero-img"), { scale: 1, duration: 1, ease: "none" }, 0)
          // the man gives way to the room he fills
          .to(q(".hero-crowd"), { opacity: 1, duration: 0.4, ease: "none" }, 0.35)
          .fromTo(q(".hero-after"), { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.62);
      }

      return () => ScrollTrigger.removeEventListener("refreshInit", place);
    }, section);

    // Entrance: lines rise out of masks while the photograph rises into its frame like a lifting curtain.
    // Held in its own context so a remount reverts it cleanly instead of stacking a second set of from() tweens.
    let split: SplitText | undefined;
    const intro = gsap.context(() => {}, section);
    const off = onReady(() => intro.add(() => {
      if (reducedMotion()) {
        gsap.set(q(".hero-intro"), { opacity: 1 });
        return;
      }
      split = SplitText.create(q("h1")[0] as HTMLElement, { type: "lines", mask: "lines", linesClass: "line" });
      gsap
        .timeline()
        .set(q(".hero-intro"), { opacity: 1 })
        .from(q(".hero-rise"), { yPercent: 100, duration: 1.8, ease: "expo.out" }, 0)
        .from(q(".crop"), { opacity: 0, duration: 1, stagger: 0.03 }, 0.9)
        .from(split.lines, { yPercent: 135, duration: 1.6, stagger: 0.12, ease: "expo.out" }, 0.1)
        .from(q(".hero-fade"), { y: 24, opacity: 0, duration: 1.2, stagger: 0.08, ease: "power3.out" }, 0.55)
        // the other frames load only once the opening has played, so the first view stays light
        .add(() => setSlides(true));
      ScrollTrigger.refresh();
    }));

    return () => {
      off();
      intro.revert();
      split?.revert();
      ctx.revert();
    };
  }, []);

  // Each market wipes up over the last and holds; the caption follows and its entry in the markets row lights up
  // with a hairline that fills for as long as it holds. Loops, and pauses off-screen.
  useEffect(() => {
    if (!slides) return;
    const section = root.current!;
    const q = gsap.utils.selector(section);
    const frames = q(".hero-slide");
    const caps = q(".hero-cap");
    const marks = q(".hero-mk");
    const bars = q(".hero-mk-bar");
    const light = (k: number) => () => marks.forEach((m, j) => (m.dataset.on = String(j === k)));

    const ctx = gsap.context(() => {
      const hold = 4.2;
      const tl = gsap.timeline({ repeat: -1, delay: 2.2 });
      let t = 0;
      frames.forEach((frame, k) => {
        const i = k + 1;
        tl.fromTo(frame, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, t)
          .fromTo(frame.querySelector("img"), { scale: 1.16 }, { scale: 1, duration: hold + 1, ease: "power1.out" }, t)
          .to(caps[i - 1], { yPercent: -100, opacity: 0, duration: 0.5, ease: "power2.in" }, t + 0.3)
          .fromTo(caps[i], { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, t + 0.75)
          .call(light(k), [], t + 0.75)
          .fromTo(bars[k], { scaleX: 0 }, { scaleX: 1, duration: hold - 0.75, ease: "none" }, t + 0.75);
        t += hold;
      });
      // Back to the man at work: the markets fade away together, then the loop begins again.
      tl.to(frames, { opacity: 0, duration: 1.4, ease: "power2.inOut" }, t)
        .to(caps[frames.length], { yPercent: -100, opacity: 0, duration: 0.5, ease: "power2.in" }, t + 0.3)
        .fromTo(caps[0], { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", immediateRender: false }, t + 0.75)
        .call(light(-1), [], t + 0.75)
        .set(bars, { scaleX: 0 }, t + 0.75)
        .set(frames, { opacity: 1, clipPath: "inset(100% 0% 0% 0%)" }, t + hold);

      ScrollTrigger.create({
        start: 0,
        end: () => window.innerHeight * 2.5,
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
    }, section);

    return () => ctx.revert();
  }, [slides]);

  return (
    <section id="top" ref={root} className="grain relative h-[100svh] min-h-[640px] overflow-hidden bg-obsidian">
      {/* Amethyst mount behind the photograph; the frame straddles its edge */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[34%] w-[80%] bg-violet lg:top-0 lg:h-full lg:w-[40%]" />
      {/* Photograph — held in a frame, released to full bleed on scroll */}
      <div className="hero-media absolute overflow-hidden">
        <div className="hero-rise absolute inset-0">
          <div className="hero-img absolute inset-0 scale-[1.12]">
            <Image
              src="/img/window-city.jpg"
              alt="A man on a call at a window above the coastline (placeholder)"
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover object-[72%_50%]"
            />
            {slides &&
              SLIDES.map((sl) => (
                <div key={sl.src} className="hero-slide absolute inset-0 overflow-hidden [clip-path:inset(100%_0_0_0)]">
                  <Image src={sl.src} alt="" fill loading="eager" sizes="100vw" className={`object-cover ${sl.pos}`} />
                </div>
              ))}
            <div className="hero-crowd absolute inset-0 opacity-0">
              <Image src="/img/arena-violet.jpg" alt="" fill sizes="100vw" className="kenburns object-cover object-[50%_40%]" />
            </div>
          </div>
          <div className="hero-shade absolute inset-0 bg-obsidian opacity-[0.12]" />
        </div>
      </div>

      <div className="hero-frame pointer-events-none absolute z-[5]">
        <Crop />
        <span className="hero-fade label absolute -bottom-9 left-0 h-[1.4em] w-[75%] overflow-hidden text-[11px] text-ash">
          {CAPTIONS.map((c, i) => (
            <span key={c} className={`hero-cap absolute left-0 top-0 whitespace-nowrap ${i ? "opacity-0" : ""}`}>
              {c}
            </span>
          ))}
        </span>
        <span className="hero-fade label absolute -bottom-9 right-0 text-[11px] text-bone/70">Dubai</span>
      </div>

      <div className="hero-intro pointer-events-none relative z-10 mx-auto flex h-full max-w-[1680px] flex-col px-5 pt-[104px] opacity-0 md:px-10 lg:pt-[132px]">
        <div className="hero-copy lg:my-auto lg:pb-10">
          <h1 className="display mt-6 text-[clamp(43px,7.3vw,127px)] text-bone short:text-[clamp(43px,11.4svh,96px)] lg:mt-10">
            <span className="block">Widest,</span>
            <span className="block pl-[0.9em] text-champagne">not the</span>
            <span className="block">tallest.</span>
          </h1>
          <p className="hero-fade mt-8 max-w-[34ch] text-[17px] leading-[1.55] text-bone/75 md:text-[19px] lg:mt-12">
            Kalpesh Kinariwala builds platforms — in iodine, private capital, real estate and live entertainment.
          </p>
        </div>

        {/* The four markets, lit in turn as the frame reaches each one */}
        <ul className="hero-markets mt-auto hidden max-w-[44%] grid-cols-4 gap-5 pb-10 lg:grid">
          {MARKETS.map((m) => (
            <li key={m.n} data-on="false" className="hero-mk hero-fade group/mk">
              <div className="relative h-14 w-full overflow-hidden bg-carbon">
                <Image
                  src={m.thumb}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover opacity-40 transition-opacity duration-700 group-data-[on=true]/mk:opacity-100"
                />
              </div>
              <span className="mt-3 block h-px w-full bg-white/15">
                <span className="hero-mk-bar block h-full origin-left scale-x-0 bg-champagne" />
              </span>
              <p className="mt-2.5 text-[13px] leading-snug text-ash transition-colors duration-500 group-data-[on=true]/mk:text-bone">
                <span className="mr-1.5 text-champagne">{m.n}</span>
                {m.name}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Revealed once the photograph fills the frame */}
      <div className="hero-after pointer-events-none absolute inset-0 z-10 flex items-end opacity-0">
        <div className="mx-auto w-full max-w-[1680px] px-5 pb-14 md:px-10 md:pb-16">
          <p className="display max-w-[14ch] text-[clamp(33px,5vw,90px)] text-bone">
            Four markets. <em className="text-champagne">One instinct.</em>
          </p>
          <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-bone/80">
            Iodine, private capital, property and live culture had nothing in common — until the same playbook was
            run through each of them.
          </p>
        </div>
      </div>
    </section>
  );
}
