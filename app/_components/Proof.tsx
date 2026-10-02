import Image from "next/image";
import Link from "next/link";
import Giant from "./Giant";
import Sheet, { WRAP } from "./Sheet";
import { getContent } from "../_lib/content";
import { CHAPTERS, type Chapter } from "./data";

// From laptops up the four cards share rows (subgrid), so each card's name, line and figure start on
// the same line as its neighbours', however many lines the one before runs to.
const ROWS = "lg:row-span-4 lg:grid lg:grid-rows-subgrid";

// The photographs are cropped to one framing (his head the same size, at the same height), so the
// four read as a set; the box follows the screen's height so the section fits in one screen.
function Card({ c }: { c: Chapter }) {
  const body = (
    <>
      <div data-reveal className="relative aspect-square w-full overflow-hidden lg:max-h-[30svh]">
        <div data-reveal-clip className="absolute inset-0 overflow-hidden bg-smoke">
          <Image
            src={c.img}
            alt={c.alt}
            fill
            sizes="(min-width:1024px) 22vw, (min-width:768px) 44vw, 78vw"
            className="object-cover object-[50%_20%] transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 z-[3] bg-[linear-gradient(to_bottom,rgb(5_5_5/.45),transparent_26%,transparent_52%,rgb(5_5_5/.85))]" />
        <span className="t-note absolute right-4 top-3 z-[3] text-gold-soft">{c.since}</span>
        <p className="t-title absolute bottom-3 left-4 right-4 z-[3] text-bone">
          {c.sector.split(" ").map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </p>
      </div>
      <p className="t-note mt-5 text-bone/60">{c.entity}</p>
      <p className="t-lead mt-2">{c.headline}</p>
      <p className="t-body mt-3 text-gold-soft">{c.proof}</p>
    </>
  );
  return c.href ? (
    <Link href={c.href.startsWith("/#") ? c.href.slice(1) : c.href} className={`group block ${ROWS}`}>
      {body}
    </Link>
  ) : (
    <div className={`group ${ROWS}`}>{body}</div>
  );
}

// Brief §5.3: the four businesses as evidence of one instinct — "the same move, four times", not a
// portfolio. Equal weight, so real estate reads as one proof point among four, never the headline.
// From laptops up it is one full screen: the line across the top, the four cards, and who has
// recognised the work along the foot, lined up under the cards.
export default async function Proof() {
  // Up to three awards the team ticks for the home page in the admin; the full record is on the press page.
  const recognised = (await getContent()).awards.filter((a) => a.home).slice(0, 3);
  return (
    <Sheet id="work" theme="dark" wash="violet" className="bg-violet text-bone">
      <div className={`${WRAP} flex min-h-[100svh] flex-col pb-28 pt-[132px] md:pb-40 md:pt-[180px] lg:pb-[4svh] lg:pt-[max(100px,12svh)]`}>
        <Giant as="h2" n={14} max={14}>
          <span className="accent mr-[0.5em]">the same move,</span>Four times
        </Giant>

        <ul className="-mx-6 mt-20 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:mt-28 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-16 md:overflow-visible md:px-0 lg:mt-[5svh] lg:grid-cols-4 lg:gap-y-0">
          {CHAPTERS.map((c) => (
            <li key={c.n} className={`w-[78vw] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none ${ROWS}`}>
              <Card c={c} />
            </li>
          ))}
        </ul>

        <div className="mt-24 grid gap-6 sm:grid-cols-2 md:mt-24 lg:mt-[6svh] lg:grid-cols-4 lg:items-baseline lg:gap-x-8">
          <p className="t-note text-bone/60">Recognised by</p>
          {recognised.map((r) => (
            <div key={r.who + r.y}>
              <p className="t-body font-bold text-bone">{r.who}</p>
              <p className="t-note text-bone/60">
                {r.what}, {r.y}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
