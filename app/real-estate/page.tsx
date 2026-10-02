import type { Metadata } from "next";
import Link from "next/link";
import Shell from "../_components/Shell";
import PageHero from "../_components/PageHero";
import Giant from "../_components/Giant";
import Scene, { ScenePhoto } from "../_components/Scene";
import { WashLayer } from "../_components/Sheet";
import { CHAPTERS } from "../_components/data";

export const metadata: Metadata = {
  title: "Real Estate",
  description:
    "Pantheon Development, Dubai: affordable luxury, delivered on schedule — more than 1,000 homes handed over in Jumeirah Village Circle since 2016.",
  alternates: { canonical: "/real-estate" },
};

const estate = CHAPTERS.find((c) => c.sector === "Real estate")!;

// The menu's Real Estate (client, 2026-09-29). Brief §2 still holds: real estate is one of the four markets
// he has built a platform in, never the identity, so the page states the record and nothing grander.
// Every figure here is the one the home page's proof card carries.
const RECORD = [
  { k: `Since ${estate.since}`, v: estate.entity },
  { k: "1,000+ homes", v: "Handed over in Jumeirah Village Circle" },
  { k: "On schedule", v: "Affordable luxury, delivered when promised" },
];

export default function RealEstatePage() {
  return (
    <Shell>
      <main>
        <PageHero
          word="Real Estate"
          line="delivered on schedule."
          photo={{ src: "/img/solo-welcome.jpg", alt: "Kalpesh Kinariwala at a Pantheon art, culture and real estate welcome", pos: "object-[50%_20%]" }}
          intro="Pantheon Development builds affordable luxury in Dubai, on the same instinct he brings to every market: find what is scattered, connect it, and manage the downside first."
        />

        <section data-theme="dark" className="relative isolate bg-plum text-bone">
          <WashLayer wash="plum" />
          <Scene
            heading={
              <Giant as="h2" n={17} max={14}>
                The record<span className="accent ml-[0.5em]">home by home.</span>
              </Giant>
            }
            figure={
              <ScenePhoto
                src="/img/shoot-estate.jpg"
                alt="Kalpesh Kinariwala at Pantheon Development"
              />
            }
          >
            <p data-fade className="t-lead max-w-[40ch] text-bone">
              {estate.proof} {estate.headline}
            </p>
            <div>
              <dl data-fade className="grid gap-8 border-t border-white/15 pt-6 sm:grid-cols-3">
                {RECORD.map((r) => (
                  <div key={r.k}>
                    <dt className="t-title gold-glow">{r.k}</dt>
                    <dd className="t-body mt-2 text-bone/80">{r.v}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/contact" className="t-body link-line mt-10 inline-block text-gold-soft">
                Enquiries →
              </Link>
            </div>
          </Scene>
        </section>
      </main>
    </Shell>
  );
}
