import Image from "next/image";
import Link from "next/link";
import Crop from "./Crop";

// Opening frame for the inner pages: label, headline and intro, then photography.
// Images carry data-reveal, so Reveals develops them like prints (a cover lifts, the image settles).

export type Tone = "dark" | "violet" | "gold";

// Surfaces the inner pages open on. Headline accents (<em>) take the contrasting brand colour.
const TONES: Record<Tone, { bg: string; fg: string; sub: string; label: string; em: string }> = {
  dark: { bg: "bg-obsidian", fg: "text-bone", sub: "text-ash", label: "text-champagne", em: "[&_em]:text-champagne" },
  violet: { bg: "bg-violet", fg: "text-bone", sub: "text-bone/70", label: "text-champagne", em: "[&_em]:text-champagne" },
  gold: { bg: "bg-champagne", fg: "text-obsidian", sub: "text-obsidian/70", label: "text-violet", em: "[&_em]:text-violet" },
};

type Frame = { src: string; alt: string; caption: string; n?: string; href?: string; pos?: string };

export function Wide({ frame, tone = "dark" }: { frame: Frame; tone?: Tone }) {
  return (
    <div data-reveal className="relative mt-12 h-[clamp(220px,40svh,480px)] md:mt-14">
      <div data-reveal-clip className="absolute inset-0 overflow-hidden bg-carbon">
        <div data-parallax="0.6" className="absolute inset-x-0 -inset-y-[12%]">
          <Image src={frame.src} alt={frame.alt} fill priority sizes="100vw" className={`object-cover ${frame.pos ?? ""}`} />
        </div>
      </div>
      <Crop tone={tone === "gold" ? "bg-obsidian/60" : "bg-champagne/70"} />
      <p className={`label absolute -bottom-9 left-0 text-[11px] ${TONES[tone].sub}`}>{frame.caption}</p>
    </div>
  );
}

const COLS: Record<number, string> = { 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5" };

export function Strip({ frames }: { frames: Frame[] }) {
  return (
    <ul
      className={`-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mt-14 md:grid md:gap-6 md:overflow-visible md:px-0 ${COLS[frames.length] ?? "md:grid-cols-4"}`}
    >
      {frames.map((f, i) => {
        const body = (
          <>
            <div data-reveal={i * 0.12} className="relative aspect-[3/4] w-full md:aspect-auto md:h-[clamp(260px,38svh,440px)]">
              <div data-reveal-clip className="absolute inset-0 overflow-hidden bg-carbon">
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  priority={i < 3}
                  sizes="(min-width:768px) 25vw, 62vw"
                  className={`object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] ${f.href ? "group-hover:scale-105" : ""} ${f.pos ?? ""}`}
                />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-3 border-t border-white/15 pt-3">
              {f.n && <span className="text-[13px] font-medium text-champagne">{f.n}</span>}
              <span className={`text-[16px] text-bone/85 ${f.href ? "transition-colors group-hover:text-champagne" : ""}`}>{f.caption}</span>
              {f.href && <span className="ml-auto text-champagne transition-transform duration-300 group-hover:translate-x-1">→</span>}
            </div>
          </>
        );
        return (
          <li key={f.src + i} className="w-[62vw] shrink-0 snap-start md:w-auto">
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
  title,
  intro,
  aside,
  tone = "dark",
  children,
}: {
  label: string;
  title: React.ReactNode;
  intro: string;
  aside?: React.ReactNode;
  tone?: Tone;
  children?: React.ReactNode;
}) {
  const t = TONES[tone];
  return (
    <section className={`${t.bg} ${t.fg}`}>
      <div className="mx-auto max-w-[1680px] px-5 pb-14 pt-28 md:px-10 md:pb-16 md:pt-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p data-fade className={`label ${t.label}`}>
              {label}
            </p>
            <h1 data-split className={`display mt-5 text-[clamp(38px,5vw,88px)] ${t.em}`}>
              {title}
            </h1>
          </div>
          <div data-fade className="lg:col-span-4">
            <p className={`max-w-[380px] text-[16px] leading-[1.65] ${t.sub}`}>{intro}</p>
            {aside}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
