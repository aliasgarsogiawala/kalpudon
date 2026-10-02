import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Shell from "../_components/Shell";
import PageHero from "../_components/PageHero";
import Giant from "../_components/Giant";
import { WRAP, WashLayer } from "../_components/Sheet";
import { FOCUS, getContent } from "../_lib/content";

export const metadata: Metadata = {
  title: "Press",
  description: "Biography, fact sheet, awards and media kit requests for Kalpesh Kinariwala.",
  alternates: { canonical: "/press" },
};

// Three full screens: the opening, the biography with the facts, and the awards. One typeface
// throughout; weight, size and colour carry the order of importance.
export default async function PressPage() {
  const { press, awards } = await getContent();
  // Awards with a photograph lead the section; the rest follow on the same three columns
  const featured = awards.filter((a) => a.featured && a.img);
  const others = awards.filter((a) => !(a.featured && a.img));
  return (
    <Shell>
      <main>
        <PageHero
          word="Press"
          bg={{ src: "/img/kk-cover-gtn.jpg", pos: "object-[50%_28%]" }}
          line="& media."
          intro="Biography, facts and awards. For interviews and the full media kit, write to the press desk."
          aside={
            <Link href="/contact/press" className="t-body link-line mt-6 inline-block text-gold-soft">
              Request the media kit →
            </Link>
          }
        />

        {/* Biography and fact sheet */}
        <section data-theme="dark" className="relative isolate bg-plum text-bone">
          <WashLayer wash="plum" />
          <div className={`${WRAP} grid min-h-[100svh] gap-12 py-28 md:py-[8svh] lg:grid-cols-12 lg:items-center lg:gap-x-[4vw]`}>
            <figure className="mx-auto w-[78%] max-w-[420px] lg:col-span-4 lg:mx-0 lg:w-full">
              <div data-reveal className="relative aspect-[4/5] -rotate-[2deg] bg-bone p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]">
                <div data-reveal-clip className="relative h-full w-full overflow-hidden bg-smoke">
                  <Image
                    src="/img/kk-interview.jpg"
                    alt="Kalpesh Kinariwala speaking during an interview"
                    fill
                    sizes="(min-width:1024px) 28vw, 78vw"
                    className="object-cover object-[15%_55%]"
                  />
                </div>
              </div>
            </figure>

            <div className="lg:col-span-8">
              <h2 className="t-note text-gold-soft">Biography</h2>
              <p className="t-lead mt-3 max-w-[42ch]">{press.bio[0]}</p>
              <div className="mt-5 grid gap-5 md:grid-cols-2 md:gap-8">
                {press.bio.slice(1).map((p) => (
                  <p key={p} className="t-body text-bone/75">
                    {p}
                  </p>
                ))}
              </div>

              <h2 className="t-note mt-10 text-gold-soft lg:mt-[5svh]">Fact sheet</h2>
              <dl className="mt-3 border-t border-white/10">
                {press.facts.map((f) => (
                  <div key={f.k} className="grid gap-1 border-b border-white/10 py-3 md:grid-cols-12 md:items-baseline md:gap-8 lg:py-[1.3svh]">
                    <dt className="t-note text-bone/55 md:col-span-3">{f.k}</dt>
                    <dd className="t-body text-bone md:col-span-9">{f.v}</dd>
                  </div>
                ))}
              </dl>

              {press.kit.length > 0 && (
                <>
                  <h2 className="t-note mt-10 text-gold-soft lg:mt-[5svh]">Media kit</h2>
                  <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                    {press.kit.map((f) => (
                      <li key={f.url}>
                        <a href={f.url} target="_blank" rel="noreferrer" download className="t-body link-line text-gold-soft">
                          {f.label} ↓
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Awards: the moments with photographs first, then the rest, on the same three columns */}
        <section data-theme="dark" className="relative isolate bg-ink text-bone">
          <WashLayer wash="ink" />
          <div className={`${WRAP} flex min-h-[100svh] flex-col py-28 md:pb-[5svh] md:pt-[max(100px,12svh)]`}>
            <Giant as="h2" n={14} max={14}>
              Awards<span className="accent ml-[0.5em]">and recognition.</span>
            </Giant>

            {featured.length > 0 && (
            <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-x-8 md:gap-y-0 lg:mt-[5svh]">
              {featured.map((f) => (
                <li key={f.who + f.what} className="md:row-span-3 md:grid md:grid-rows-subgrid md:[&:nth-child(n+4)]:mt-14">
                  <div data-reveal className="relative aspect-[4/5] w-full md:aspect-auto md:h-[34svh] md:min-h-[240px]">
                    <div data-reveal-clip className="absolute inset-0 overflow-hidden bg-smoke">
                      <Image src={f.img} alt={f.alt} fill sizes="(min-width:768px) 30vw, 90vw" className={`object-cover ${FOCUS[f.focus]}`} />
                    </div>
                  </div>
                  <p className="t-title mt-5">{f.what}</p>
                  <p className="t-note mt-1 text-bone/60">
                    {f.who}, {f.y}
                  </p>
                </li>
              ))}
            </ul>
            )}

            <ul className="mt-14 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-3 md:gap-8 lg:mt-auto">
              {others.map((r) => (
                <li key={r.who + r.y}>
                  <p className="t-body font-bold">{r.what}</p>
                  <p className="t-note text-bone/60">
                    {r.who}, {r.y}
                  </p>
                </li>
              ))}
            </ul>
            <p className="t-note mt-6 text-bone/45">High-resolution photographs come with the media kit, with credit and usage terms.</p>
          </div>
        </section>
      </main>
    </Shell>
  );
}
