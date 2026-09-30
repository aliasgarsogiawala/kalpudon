import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Shell from "../_components/Shell";
import PageHero from "../_components/PageHero";
import Giant from "../_components/Giant";
import LiveVideo from "../_components/LiveVideo";
import { WRAP, WashLayer } from "../_components/Sheet";
import { DOORS, HOP_FACTS } from "../_components/data";

export const metadata: Metadata = {
  title: "HOP Events",
  description:
    "HOP Events produces India's leading artists at arena scale in the UAE. Co-productions, touring and venue partnerships with Kalpesh Kinariwala's live-entertainment company.",
  alternates: { canonical: "/hop" },
};

const door = DOORS.find((d) => d.slug === "hop")!;

// A night from the floor, backstage and on stage: the event shoot (brief §5.4, §7: live events carry
// the most energy). Every frame is one the home page doesn't use.
const NIGHT = [
  { img: "/img/kk-crowd.jpg", t: "In the arena", pos: "object-[27%_35%]" },
  { img: "/img/kk-stage.jpg", t: "On stage", pos: "object-[72%_30%]" },
  { img: "/img/kk-lounge.jpg", t: "Backstage", pos: "object-[38%_30%]" },
  { img: "/img/kk-interview.jpg", t: "Interviews", pos: "object-[28%_30%]" },
  { img: "/img/kk-guest.jpg", t: "With guests", pos: "object-[33%_30%]" },
  { img: "/img/kk-laugh.jpg", t: "With the audience", pos: "object-[30%_30%]" },
];

const NAMES = ["Arijit Singh", "A.R. Rahman", "Rishab Sharma", "Etihad Arena", "Shows of India"];

// Brief §4: HOP as a section on the home page and its own page for the people it serves — artists,
// promoters and venues. Five full screens: the opening, the record, the room, the night, the way in.
export default function HopPage() {
  return (
    <Shell>
      <main>
        <PageHero
          word="HOP"
          line="at arena scale."
          bg={{ src: "/img/kk-arena-watch.jpg", pos: "object-[50%_45%]" }}
          intro="Live entertainment is the most fragmented market he has entered. HOP puts artists, promoters, venues and audiences in the same room, on a network and a production record built show by show."
          aside={
            <Link href="/contact/hop" className="t-body link-line mt-6 inline-block text-gold-soft">
              Partner with HOP →
            </Link>
          }
        />

        {/* The record */}
        <section data-theme="dark" className="relative isolate bg-plum text-bone">
          <WashLayer wash="plum" />
          <div className={`${WRAP} flex min-h-[100svh] flex-col py-28 md:pb-[8svh] md:pt-[max(100px,12svh)]`}>
            <Giant as="h2" n={17} max={14}>
              The record<span className="accent ml-[0.5em]">built show by show.</span>
            </Giant>
            <p data-fade className="t-lead mt-10 max-w-[40ch] md:mt-[6svh]">
              {door.body}
            </p>
            <dl className="mt-16 grid gap-10 border-t border-white/10 pt-8 md:mt-auto md:grid-cols-3 md:gap-8">
              {HOP_FACTS.map((f) => (
                <div key={f.k} data-fade>
                  <dt className="t-statement font-bold text-gold-soft">{f.k}</dt>
                  <dd className="t-body mt-2 text-bone">{f.v}</dd>
                  <dd className="t-note mt-1 text-stone">{f.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* The room: the footage itself */}
        <section data-theme="dark" className="relative isolate flex min-h-[100svh] overflow-hidden bg-ink text-bone">
          <LiveVideo src="/video/hop-live.mp4" poster="/video/hop-live.jpg" className="absolute inset-0 -z-[1] size-full object-cover" />
          <div aria-hidden className="absolute inset-0 -z-[1] bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
          <div className={`${WRAP} flex flex-col justify-end py-28 md:pb-[8svh]`}>
            <Giant as="h2" n={12} max={18}>
              The room<span className="accent ml-[0.5em]">live.</span>
            </Giant>
            <p aria-label={NAMES.join(", ")} className="t-title mt-8 text-bone/80">
              {NAMES.join(" · ")}
            </p>
          </div>
        </section>

        {/* The night, from the floor */}
        <section data-theme="dark" className="relative isolate bg-ink text-bone">
          <WashLayer wash="ink" />
          <div className={`${WRAP} flex min-h-[100svh] flex-col py-28 md:pb-[6svh] md:pt-[max(100px,12svh)]`}>
            <h2 className="t-statement">
              Behind the night <em className="text-gold-soft">with Jasmine Sandlas, live.</em>
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-[4svh] md:flex-1 md:grid-cols-3 md:grid-rows-2 md:gap-5">
              {NIGHT.map((p, i) => (
                <li key={p.img} className="relative aspect-[4/5] md:aspect-auto md:min-h-[180px]">
                  <figure className="absolute inset-0">
                    <div data-reveal={Math.min(i, 3) * 0.1} data-reveal-clip className="absolute inset-0 overflow-hidden bg-coal">
                      <Image src={p.img} alt={`Kalpesh Kinariwala — ${p.t.toLowerCase()}`} fill sizes="(min-width:768px) 32vw, 48vw" className={`object-cover ${p.pos}`} />
                    </div>
                    <figcaption className="t-note absolute bottom-0 left-0 z-[3] bg-ink/75 px-3 py-1.5 text-bone/85 backdrop-blur-sm">{p.t}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The way in */}
        <section data-theme="dark" className="relative isolate bg-violet text-bone">
          <WashLayer wash="violet" />
          <div className={`${WRAP} flex min-h-[100svh] flex-col justify-center py-28`}>
            <p className="t-note text-gold-soft">{door.who}</p>
            <Link href="/contact/hop" className="group mt-4 block transition-colors duration-500 hover:text-gold-soft">
              <Giant as="h2" n={16} max={20}>
                Partner with HOP
              </Giant>
            </Link>
            <ul className="mt-12 grid gap-6 border-t border-white/10 pt-6 md:mt-[6svh] md:grid-cols-3 md:gap-8">
              {door.offers.map((o) => (
                <li key={o} className="t-title">
                  {o}
                </li>
              ))}
            </ul>
            <Link href="/contact/hop" className="t-body link-line mt-12 w-fit text-gold-soft md:mt-[6svh]">
              {door.cta} →
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
