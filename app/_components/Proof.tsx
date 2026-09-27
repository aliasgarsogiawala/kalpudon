import Image from "next/image";
import Link from "next/link";
import Giant from "./Giant";
import Sheet, { PAD, WRAP } from "./Sheet";
import { CHAPTERS, RECOGNITION, type Chapter } from "./data";

// Only the names a visitor would recognise; the full record lives on the press page.
const RECOGNISED = ["Entrepreneur Middle East", "Forbes Middle East", "Shows of India"].map(
  (who) => RECOGNITION.find((r) => r.who === who)!,
);

function Card({ c }: { c: Chapter }) {
  const body = (
    <>
      <div data-reveal className="relative aspect-[4/5] overflow-hidden">
        <div data-reveal-clip className="absolute inset-0 overflow-hidden bg-smoke">
          <Image
            src={c.img}
            alt={c.alt}
            fill
            sizes="(min-width:1280px) 22vw, (min-width:768px) 44vw, 90vw"
            className={`object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 ${c.pos ?? ""}`}
          />
        </div>
        <div className="absolute inset-0 z-[3] bg-[linear-gradient(to_bottom,rgb(5_5_5/.55),transparent_28%,transparent_55%,rgb(5_5_5/.88))]" />
        <span className="serif absolute right-5 top-4 z-[3] text-[24px] text-gold-soft">{c.since}</span>
        <p className="absolute bottom-4 left-5 right-5 z-[3] text-[clamp(34px,2.8vw,48px)] display leading-[0.9] text-bone">
          {c.sector}
        </p>
      </div>
      <p className="eyebrow mt-6 text-[10px] text-bone/70">{c.entity}</p>
      <p className="serif mt-3 text-[clamp(24px,1.9vw,32px)] leading-[1.08]">{c.headline}</p>
      <p className="mt-4 text-[15px] leading-[1.55] text-gold-soft">{c.proof}</p>
    </>
  );
  return c.href ? (
    <Link href={c.href.startsWith("/#") ? c.href.slice(1) : c.href} className="group block">
      {body}
    </Link>
  ) : (
    <div className="group">{body}</div>
  );
}

// Brief §5.3: the four businesses as evidence of one instinct — "the same move, four times", not a
// portfolio. Equal weight, so real estate reads as one proof point among four, never the headline.
export default function Proof() {
  return (
    <Sheet id="work" theme="dark" wash="violet" className="bg-violet text-bone">
      <div className={`${WRAP} ${PAD}`}>
        <h2 aria-label="The same move, four times." className="relative">
          <span aria-hidden className="script script-outline absolute -top-[0.7em] left-[1%] z-[2] -rotate-[7deg] text-[clamp(32px,6vw,112px)] text-gold-soft [--outline:var(--violet)]">
            the same move,
          </span>
          <Giant as="span" n={10} max={24} className="text-right">
            Four times
          </Giant>
        </h2>

        <ul className="-mx-6 mt-20 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:mt-40 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-20 md:overflow-visible md:px-0 xl:grid-cols-4">
          {CHAPTERS.map((c) => (
            <li key={c.n} className="w-[78vw] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none">
              <Card c={c} />
            </li>
          ))}
        </ul>

        <div className="mt-32 grid gap-8 md:mt-48 lg:grid-cols-12 lg:items-baseline">
          <p className="eyebrow text-bone/60 lg:col-span-3">Recognised by</p>
          <ul className="grid gap-6 sm:grid-cols-3 lg:col-span-9">
            {RECOGNISED.map((r) => (
              <li key={r.who} data-fade>
                <p className="serif text-[clamp(26px,2.2vw,36px)] leading-[1.02]">{r.who}</p>
                <p className="mt-2 text-[14px] text-bone/60">
                  {r.what}, {r.y}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Sheet>
  );
}
