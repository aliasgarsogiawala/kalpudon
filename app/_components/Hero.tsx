"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText, onReady, reducedMotion } from "./gsap";
import Sheet from "./Sheet";

// The box of the character at `at` (negative counts from the end), wherever SplitText has put it.
function glyph(el: HTMLElement, at: number) {
  const chars: [Text, number][] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null)
    for (let i = 0; i < node.data.length; i++) if (node.data[i].trim()) chars.push([node, i]);
  const [node, i] = chars[at < 0 ? chars.length + at : at];
  const range = document.createRange();
  range.setStart(node, i);
  range.setEnd(node, i + 1);
  return { ch: node.data[i], box: range.getBoundingClientRect() };
}

// Where a character's ink starts or ends. The DOM only knows each letter's advance box, so the side
// bearing comes from the font itself, measured on a canvas.
function inkX(el: HTMLElement, at: number, edge: "start" | "end") {
  const { ch, box } = glyph(el, at);
  const cs = getComputedStyle(el);
  const ctx = document.createElement("canvas").getContext("2d")!;
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const m = ctx.measureText(ch);
  return edge === "start" ? box.left - m.actualBoundingBoxLeft : box.left + m.actualBoundingBoxRight;
}

// Sizes and places a line so its letters run exactly from x `from` to x `to`.
function fitInk(el: HTMLElement, from: number, to: number) {
  el.style.marginLeft = "0px";
  const left = el.getBoundingClientRect().left;
  const a = inkX(el, 0, "start") - left;
  const b = inkX(el, -1, "end") - left;
  const k = (to - from) / (b - a);
  el.style.fontSize = `${parseFloat(getComputedStyle(el).fontSize) * k}px`;
  el.style.marginLeft = `${from - left - a * k}px`;
}

// A cover, not a landing page: the man under a spotlight in front of his name. His first name runs the
// header's full measure, from the edge of the monogram to the end of the last link, and his surname sits
// under its last three letters in light gold. Nothing else competes.
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current!.closest("section")!;
    const q = gsap.utils.selector(section);
    const first = () => q(".hero-first")[0] as HTMLElement;

    // Depth on scroll: the masthead lifts away faster than the man, who holds the frame longest.
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } })
        .to(q(".hero-mast"), { yPercent: -45, opacity: 0.15, ease: "none" }, 0)
        .to(q(".hero-figure"), { yPercent: 6, ease: "none" }, 0);
    }, section);

    // Header marks the name aligns to ([data-edge]): whichever are showing at this width.
    const fitMast = () => {
      const edges = [...document.querySelectorAll("header [data-edge]")]
        .map((e) => e.getBoundingClientRect())
        .filter((r) => r.width);
      if (!edges.length) return;
      const to = Math.max(...edges.map((r) => r.right));
      fitInk(first(), Math.min(...edges.map((r) => r.left)), to);
      fitInk(q(".hero-surname")[0] as HTMLElement, inkX(first(), -3, "start"), to);
    };

    // His head sits over the "p": its tail drops below the line, and he covers it wherever the name lands.
    const placeHead = () => {
      const p = glyph(first(), first().textContent!.indexOf("p")).box;
      const frame = section.getBoundingClientRect();
      section.style.setProperty("--head-x", `${p.left + p.width * 0.36 - (frame.left + frame.width / 2)}px`);
    };

    const onResize = () => requestAnimationFrame(() => {
      fitMast();
      placeHead();
    });
    window.addEventListener("resize", onResize);

    const splits: SplitText[] = [];
    const intro = gsap.context(() => {}, section);
    let cancelled = false;
    const off = onReady(() =>
      document.fonts.ready.then(() => {
        if (cancelled) return;
        // Split before measuring, so the letters are fitted where they will actually sit.
        const motion = !reducedMotion();
        if (motion) splits.push(...q(".hero-first, .hero-surname").map((el) => SplitText.create(el, { type: "chars" })));
        fitMast();
        placeHead();
        intro.add(() => {
          gsap.set(q(".hero-intro"), { opacity: 1 });
          if (!motion) return;
          gsap
            .timeline()
            .from(q(".hero-light"), { opacity: 0, duration: 2.2, ease: "power2.out" }, 0)
            .from(splits[0].chars, { yPercent: 40, opacity: 0, duration: 1.4, stagger: 0.05, ease: "expo.out" }, 0.1)
            .from(q(".hero-figure-in"), { yPercent: 8, opacity: 0, duration: 1.6, ease: "expo.out" }, 0.35)
            .from(splits[1].chars, { yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.035, ease: "expo.out" }, 0.8);
        });
        ScrollTrigger.refresh();
      }),
    );

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      off();
      intro.revert();
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <Sheet id="top" theme="dark" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      {/* Phones stack the same cover in flow (the name, then the man); from tablets up the name is set over
          the frame. --fw keeps his shoulders inside a phone screen. */}
      <div
        ref={root}
        className="hero-intro absolute inset-0 flex flex-col pt-[92px] opacity-0 [--fw:min(108vw,480px,calc((100svh_-_220px)_*_0.787))] md:block md:pt-0"
      >
        {/* The spotlight: a beam from above and warm light pooling behind him */}
        <div aria-hidden className="hero-light absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(48%_36%_at_50%_48%,rgb(196_120_52/.34),rgb(120_34_28/.16)_48%,transparent_78%)] md:bg-[radial-gradient(30%_52%_at_50%_60%,rgb(196_120_52/.34),rgb(120_34_28/.16)_48%,transparent_78%)]" />
          <div className="absolute left-1/2 top-0 h-full w-[140%] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_-8%,transparent_164deg,rgb(239_211_148/.1)_174deg,rgb(239_211_148/.16)_180deg,rgb(239_211_148/.1)_186deg,transparent_196deg)] md:w-full" />
        </div>

        {/* The masthead, behind him. Sizes here are only a first guess; fitMast() sets them from the header. */}
        <h1
          aria-label="Kalpesh Kinariwala"
          className="hero-mast relative text-white md:absolute md:inset-x-0 md:top-[104px] short:top-[92px]"
        >
          <span className="hero-first giant text-[min(26vw,48svh)]">Kalpesh</span>
          <span className="hero-surname giant gold-glow relative z-[2] text-[8.2vw] md:z-auto">Kinariwala</span>
        </h1>

        {/* The man, in front of it */}
        <div className="hero-figure relative z-[1] mx-auto mt-2 w-[var(--fw)] md:absolute md:inset-x-0 md:bottom-0 md:z-auto md:mt-0 md:flex md:w-auto md:justify-center">
          <div className="hero-figure-in relative aspect-[792/1006] w-full translate-x-[var(--head-x,0px)] [mask-image:linear-gradient(to_bottom,#000_68%,transparent_97%)] md:aspect-auto md:h-[72svh] md:w-[calc(72svh*0.787)] md:shrink-0 md:translate-y-[9%] md:[mask-image:none]">
            <Image
              src="/img/hero-cut.png"
              alt="Kalpesh Kinariwala"
              fill
              preload
              sizes="(min-width:768px) 64svh, 100vw"
              className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,.6)]"
            />
          </div>
        </div>

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div aria-hidden className="grain absolute inset-0" />
      </div>
    </Sheet>
  );
}
