import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Shell from "../_components/Shell";
import PageHero, { Wide } from "../_components/PageHero";
import { WRAP, WashLayer } from "../_components/Sheet";
import { PRESS_BIO, PRESS_FACTS, RECOGNITION } from "../_components/data";

export const metadata: Metadata = {
  title: "Press",
  description: "Biography, fact sheet, recognition and media kit requests for Kalpesh Kinariwala.",
  alternates: { canonical: "/press" },
};

// Placeholders until approved photography from the brand shoot (brief §9).
const PHOTOS = [
  { img: "/img/kk-pantheon-wall.jpg", t: "At Pantheon", pos: "object-[50%_30%]" },
  { img: "/img/kk-consulate.jpg", t: "In the room", pos: "object-[50%_30%]" },
  { img: "/img/kk-stage.jpg", t: "On stage", pos: "object-[72%_30%]" },
];

export default function PressPage() {
  return (
    <Shell>
      <main>
        <PageHero
          word="Press"
          bg={{ src: "/img/kk-cover-gtn.jpg", pos: "object-[50%_28%]" }}
          script="& media."
          intro="Biography, facts and approved photography. For interviews and the full media kit, write to the press desk."
          aside={
            <Link
              href="/contact/press"
              className="link-line mt-7 inline-block text-[17px] text-gold-soft"
            >
              Request the media kit →
            </Link>
          }
        >
          <Wide frame={{ src: "/img/kk-arena-watch.jpg", alt: "Kalpesh Kinariwala watching the show from the floor of the arena", caption: "HOP Events — Jasmine Sandlas, live.", pos: "object-[50%_40%]" }} />
        </PageHero>

        <section data-theme="dark" className="relative isolate bg-plum text-bone">
          <WashLayer wash="plum" />
          <div className={`${WRAP} grid gap-10 py-32 md:py-52 lg:grid-cols-12`}>
            <div className="lg:col-span-3">
              <h2 data-fade className="eyebrow text-gold">
                Biography
              </h2>
            </div>
            <div className="space-y-6 lg:col-span-7">
              {PRESS_BIO.map((p, i) => (
                <p
                  key={i}
                  data-fade
                  className={i === 0 ? "serif text-[clamp(30px,2.9vw,50px)] leading-[1.08]" : "text-[17px] leading-[1.75] text-bone/75"}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className={`${WRAP} grid gap-10 pb-32 md:pb-52 lg:grid-cols-12`}>
            <div className="lg:col-span-3">
              <h2 data-fade className="eyebrow text-gold">
                Fact sheet
              </h2>
            </div>
            <dl className="lg:col-span-9">
              {PRESS_FACTS.map((f) => (
                <div key={f.k} className="relative grid gap-2 py-6 md:grid-cols-12 md:gap-8">
                  <dt className="text-[15px] font-medium text-bone/60 md:col-span-3">{f.k}</dt>
                  <dd className="serif text-[clamp(24px,1.9vw,32px)] leading-[1.15] md:col-span-9">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section data-theme="dark" className="relative isolate bg-ink text-bone">
          <WashLayer wash="ink" />
          <div className={`${WRAP} py-32 md:py-52`}>
            <h2 data-split className="serif text-[clamp(48px,6vw,110px)] leading-[0.92]">
              Recognition
            </h2>
            <ul className="mt-12">
              {RECOGNITION.map((r) => (
                <li key={r.who + r.y} className="relative grid grid-cols-12 items-baseline gap-4 py-6">
                  <span className="serif col-span-12 text-[clamp(28px,2.4vw,40px)] leading-[1.05] md:col-span-5">{r.who}</span>
                  <span className="col-span-9 text-[16px] text-bone/70 md:col-span-5">{r.what}</span>
                  <span className="serif col-span-3 text-right text-[26px] text-gold-soft md:col-span-2">{r.y}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section data-theme="dark" className="bg-coal text-bone">
          <div className={`${WRAP} py-32 md:py-52`}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 data-split className="serif text-[clamp(44px,5vw,92px)] leading-[0.92]">
                Photography
              </h2>
              <p data-fade className="max-w-[360px] text-[16px] leading-relaxed text-stone">
                High-resolution files come with the media kit. Credit and usage terms are included.
              </p>
            </div>
            <ul className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
              {PHOTOS.map((p) => (
                <li key={p.t}>
                  <div data-reveal className="relative aspect-[4/5]">
                    <div data-reveal-clip className="absolute inset-0 overflow-hidden bg-smoke">
                      <Image src={p.img} alt={`Kalpesh Kinariwala — ${p.t}`} fill sizes="(min-width:768px) 30vw, 90vw" className={`object-cover ${p.pos}`} />
                    </div>
                  </div>
                  <p className="mt-5 text-[15px] text-bone/80">{p.t}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Shell>
  );
}
