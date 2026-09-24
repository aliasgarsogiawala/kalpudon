import Image from "next/image";
import { MOVES } from "./data";

function Inline({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative mx-[0.12em] inline-block h-[0.74em] w-[1.1em] translate-y-[0.04em] overflow-hidden align-baseline">
      <Image src={src} alt={alt} fill sizes="120px" className="object-cover" />
    </span>
  );
}

export default function Thesis() {
  return (
    <section id="thesis" className="relative bg-champagne text-obsidian">
      <div className="mx-auto max-w-[1680px] px-5 pb-16 pt-24 md:px-10 md:pb-24 md:pt-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p data-fade className="label text-obsidian/55">
              The thesis
            </p>
          </div>
          <p
            data-scrub-words
            className="display-sm text-[clamp(26px,3.4vw,59px)] leading-[1.08] lg:col-span-9"
          >
            He doesn’t choose industries. He chooses <em>fragmentation</em> — in iodine
            <Inline src="/img/iodine-crystals.jpg" alt="" />, in capital
            <Inline src="/img/gold-leaf.jpg" alt="" />, in property
            <Inline src="/img/dubai-night.jpg" alt="" /> and now on stage
            <Inline src="/img/confetti.jpg" alt="" />. Then he engineers the downside before anyone mentions the
            upside — and lets scale follow.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1680px] px-5 pb-16 md:px-10 md:pb-24">
        <div className="flex items-end justify-between gap-6 pb-8">
          <h2 data-split className="display text-[clamp(30px,4.1vw,73px)]">
            The playbook
          </h2>
          <p data-fade className="hidden max-w-[300px] pb-3 text-[16px] leading-relaxed text-obsidian/60 md:block">
            Run four times, in four markets that shared nothing but the shape of their problem.
          </p>
        </div>

        <ol>
          {MOVES.map((m, i) => (
            <li key={m.title} className="relative">
              <span data-rule className="absolute inset-x-0 top-0 h-px origin-left bg-obsidian/25" />
              <div className="grid gap-4 py-10 md:grid-cols-12 md:items-center md:gap-8 md:py-12">
                <span
                  data-fade
                  className="display text-[64px] leading-[0.8] text-transparent [-webkit-text-stroke:1px_var(--obsidian)] md:col-span-2 md:text-[92px]"
                >
                  {i + 1}
                </span>
                <h3 data-split className="display text-[clamp(26px,3vw,54px)] md:col-span-6">
                  {m.title}
                </h3>
                <p data-fade className="max-w-[440px] text-[17px] leading-[1.65] text-obsidian/65 md:col-span-4">
                  {m.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
