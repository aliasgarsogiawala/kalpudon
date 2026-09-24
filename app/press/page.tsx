import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Shell from "../_components/Shell";
import Crop from "../_components/Crop";
import PageHero, { Wide } from "../_components/PageHero";
import { PRESS_BIO, PRESS_FACTS, RECOGNITION } from "../_components/data";

export const metadata: Metadata = {
  title: "Press",
  description: "Biography, fact sheet, recognition and media kit requests for Kalpesh Kinariwala.",
  alternates: { canonical: "/press" },
};

// Placeholders until approved photography from the brand shoot (brief §9).
const PHOTOS = [
  { img: "/img/portrait.jpg", t: "Portrait, profile", pos: "object-[35%_20%]" },
  { img: "/img/window-city.jpg", t: "At work, Dubai", pos: "object-[72%_50%]" },
  { img: "/img/stage-gold.jpg", t: "HOP Events, live", pos: "object-center" },
];

export default function PressPage() {
  return (
    <Shell>
      <main>
        <PageHero
          label="Press"
          tone="gold"
          title={
            <>
              Press &amp; <em>media.</em>
            </>
          }
          intro="Biography, facts and approved photography. For interviews and the full media kit, write to the press desk."
          aside={
            <Link
              href="/contact/press"
              className="mt-7 inline-block bg-obsidian px-7 py-4 text-[15px] font-medium text-champagne transition-colors duration-500 hover:bg-violet"
            >
              Request the media kit →
            </Link>
          }
        >
          <Wide frame={{ src: "/img/door-press.jpg", alt: "A printing press running newspapers (placeholder)", caption: "Fig. — On the record" }} tone="gold" />
        </PageHero>

        <section className="bg-violet text-bone">
          <div className="mx-auto grid max-w-[1680px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <h2 data-fade className="label text-champagne">
                Biography
              </h2>
            </div>
            <div className="space-y-6 lg:col-span-7">
              {PRESS_BIO.map((p, i) => (
                <p
                  key={i}
                  data-fade
                  className={i === 0 ? "display-sm text-[clamp(25px,2.3vw,40px)] leading-[1.15]" : "text-[17px] leading-[1.7] text-bone/80"}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="mx-auto grid max-w-[1680px] gap-10 px-5 pb-16 md:px-10 md:pb-24 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <h2 data-fade className="label text-champagne">
                Fact sheet
              </h2>
            </div>
            <dl className="lg:col-span-9">
              {PRESS_FACTS.map((f) => (
                <div key={f.k} className="relative grid gap-2 py-6 md:grid-cols-12 md:gap-8">
                  <span data-rule className="absolute inset-x-0 top-0 h-px origin-left bg-white/20" />
                  <dt className="text-[15px] font-medium text-bone/65 md:col-span-3">{f.k}</dt>
                  <dd className="display-sm text-[clamp(20px,1.6vw,27px)] leading-[1.25] md:col-span-9">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-champagne text-obsidian">
          <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-20">
            <h2 data-split className="display text-[clamp(35px,4.8vw,87px)]">
              Recognition
            </h2>
            <ul className="mt-12">
              {RECOGNITION.map((r) => (
                <li key={r.who + r.y} className="relative grid grid-cols-12 items-baseline gap-4 py-6">
                  <span data-rule className="absolute inset-x-0 top-0 h-px origin-left bg-obsidian/30" />
                  <span className="display-sm col-span-12 text-[clamp(22px,2vw,32px)] md:col-span-5">{r.who}</span>
                  <span className="col-span-9 text-[16px] text-obsidian/75 md:col-span-5">{r.what}</span>
                  <span className="display-sm col-span-3 text-right text-[20px] md:col-span-2">{r.y}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-obsidian text-bone">
          <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 data-split className="display text-[clamp(30px,3.4vw,63px)]">
                Photography
              </h2>
              <p data-fade className="max-w-[360px] text-[16px] leading-relaxed text-ash">
                High-resolution files come with the media kit. Credit and usage terms are included.
              </p>
            </div>
            <ul className="mt-14 grid gap-14 md:grid-cols-3 md:gap-10">
              {PHOTOS.map((p) => (
                <li key={p.t}>
                  <div data-reveal className="relative aspect-[4/5]">
                    <div data-reveal-clip className="absolute inset-0 overflow-hidden bg-carbon">
                      <Image src={p.img} alt={`${p.t} (placeholder)`} fill sizes="(min-width:768px) 30vw, 90vw" className={`object-cover grayscale ${p.pos}`} />
                    </div>
                    <Crop />
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
