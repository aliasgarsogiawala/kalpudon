import Image from "next/image";
import Link from "next/link";
import Giant from "./Giant";
import { WRAP, WashLayer } from "./Sheet";

// Opening frame for the inner pages: a giant word with a line written across it, the intro beside
// a hairline, then photography. Images carry data-reveal, so Reveals develops them like prints.

type Frame = { src: string; alt: string; caption: string; n?: string; href?: string; pos?: string };

export function Wide({ frame }: { frame: Frame }) {
  return (
    <figure className="mt-14 md:mt-16">
      <div data-reveal className="relative h-[clamp(240px,48svh,560px)]">
        <div data-reveal-clip className="absolute inset-0 overflow-hidden bg-coal">
          <div data-parallax="0.6" className="absolute inset-x-0 -inset-y-[12%]">
            <Image src={frame.src} alt={frame.alt} fill preload sizes="100vw" className={`object-cover ${frame.pos ?? ""}`} />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-[14px] text-stone">{frame.caption}</figcaption>
    </figure>
  );
}

const COLS: Record<number, string> = { 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5" };

export function Strip({ frames }: { frames: Frame[] }) {
  return (
    <ul
      className={`-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mt-16 md:grid md:gap-6 md:overflow-visible md:px-0 ${COLS[frames.length] ?? "md:grid-cols-4"}`}
    >
      {frames.map((f, i) => {
        const body = (
          <>
            <div data-reveal={i * 0.12} className="relative aspect-[4/5] w-full md:aspect-auto md:h-[clamp(280px,42svh,480px)]">
              <div data-reveal-clip className="absolute inset-0 overflow-hidden bg-coal">
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  loading={i < 3 ? "eager" : "lazy"}
                  sizes="(min-width:768px) 33vw, 72vw"
                  className={`object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] ${f.href ? "group-hover:scale-105" : ""} ${f.pos ?? ""}`}
                />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className={`serif text-[22px] leading-tight text-bone ${f.href ? "transition-colors group-hover:text-gold-soft" : ""}`}>
                {f.caption}
              </span>
              {f.href && <span className="ml-auto text-gold transition-transform duration-300 group-hover:translate-x-1">→</span>}
            </div>
          </>
        );
        return (
          <li key={f.src + i} className="w-[72vw] shrink-0 snap-start md:w-auto">
            {f.href ? (
              <Link href={f.href} className="group block">
                {body}
              </Link>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function PageHero({
  label,
  word,
  script,
  intro,
  aside,
  children,
}: {
  label: string;
  /** The giant word. */
  word: string;
  /** The line written across it. */
  script: string;
  intro: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section data-theme="dark" className="relative isolate bg-ink text-bone">
      <WashLayer wash="ink" />
      <div className={`${WRAP} pb-24 pt-[132px] md:pb-40 md:pt-[200px]`}>
        <p className="eyebrow text-gold">{label}</p>
        <h1 aria-label={`${word} ${script}`} className="relative mt-10 md:mt-14">
          <Giant as="span" n={word.length} max={24} stretch={1.3} stretchSm={1.6}>
            {word}
          </Giant>
          <span
            aria-hidden
            className="script script-outline absolute bottom-[2%] right-[2%] z-[2] -rotate-[6deg] text-[clamp(40px,6vw,112px)] text-gold-soft"
          >
            {script}
          </span>
        </h1>
        <div className="mt-28 grid lg:grid-cols-2 md:mt-40">
          <div className="hidden lg:block" />
          <div data-fade className="lg:pl-20">
            <p className="max-w-[460px] text-[18px] leading-[1.6] text-bone/85">{intro}</p>
            {aside}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
