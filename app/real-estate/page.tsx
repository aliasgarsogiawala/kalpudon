import type { Metadata } from "next";
import Link from "next/link";
import Shell from "../_components/Shell";
import PageHero from "../_components/PageHero";
import Giant from "../_components/Giant";
import Scene, { ScenePhoto } from "../_components/Scene";
import { WashLayer } from "../_components/Sheet";
import Marquee from "../_components/Marquee";
import { CHAPTERS, DEVELOPMENTS } from "../_components/data";

export const metadata: Metadata = {
  title: "Real Estate",
  description:
    "Pantheon Development, Dubai: affordable luxury, delivered on schedule — 5,000+ apartments launched and sold to buyers from over 72 countries, AED 4.2 billion in gross development value and 1,000+ apartments delivered since 2016.",
  alternates: { canonical: "/real-estate" },
};

const estate = CHAPTERS.find((c) => c.sector === "Real estate")!;

// The menu's Real Estate (client, 2026-09-29). Brief §2 still holds: real estate is one of the four markets
// he has built a platform in, never the identity, so the page states the record and nothing grander.
// Figures from the client's achievements document and media profile (October 2026), and Raj (2026-10-09).
const RECORD = [
  { k: `Since ${estate.since}`, v: estate.entity },
  { k: "5,000+ apartments", v: "Launched and sold", count: true },
  { k: "72+ countries", v: "Where the buyers come from", count: true },
  { k: "AED 4.2 billion", v: "Gross development value", count: true },
  { k: "1,000+ apartments", v: "Delivered, in Jumeirah Village Circle", count: true },
  { k: "10 developments", v: "Delivered or launched, with thousands more homes in the pipeline", count: true },
  { k: "2 emirates", v: "Dubai, and Ras Al Khaimah — among the first private developers in RAK Central", count: true },
  { k: "On schedule", v: "Known in the industry as “the Delivery Man of JVC”" },
  { k: "#2 workplace", v: "Best Workplace in Real Estate, Middle East 2026 — Great Place to Work", count: true },
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

        {/* The portfolio by name, running across the screen */}
        <Marquee names={DEVELOPMENTS} />

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
            {/* The figures are all in the record below, so the line above it is the promise alone */}
            <p data-fade className="t-lead max-w-[40ch] text-bone">
              {estate.headline}
            </p>
            <div>
              <dl data-fade className="grid gap-8 border-t border-white/15 pt-6 sm:grid-cols-3">
                {RECORD.map((r) => (
                  <div key={r.k}>
                    <dt className="t-title gold-glow" data-count={r.count || undefined}>
                      {r.k}
                    </dt>
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
