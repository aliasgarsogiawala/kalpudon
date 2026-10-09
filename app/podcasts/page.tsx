import type { Metadata } from "next";
import Shell from "../_components/Shell";
import PageHero from "../_components/PageHero";
import Episode from "../_components/Episode";
import { WRAP, WashLayer } from "../_components/Sheet";
import { YOUTUBE, aired } from "../_components/data";
import { getContent, youtubeId } from "../_lib/content";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Podcasts and interviews with Kalpesh Kinariwala on real estate, markets and building in the UAE.",
  alternates: { canonical: "/podcasts" },
};

// Raj, 2026-10-09: his podcasts on a page of their own. Every episode plays in place; his YouTube
// channel holds the rest.
export default async function PodcastsPage() {
  const episodes = (await getContent()).podcasts.flatMap((p) => {
    const id = youtubeId(p.url);
    return id ? [{ ...p, id }] : [];
  });
  return (
    <Shell>
      <main>
        <PageHero
          word="Podcasts"
          photo={{ src: "/img/podcast-studio-hd.jpg", alt: "Kalpesh Kinariwala on air in the Dubai Eye 103.8 studio", pos: "object-[50%_20%]" }}
          line="in his own words."
          intro="Long conversations with the hosts who asked: on real estate, on markets, and on how the businesses were built."
        />
        <section data-theme="dark" className="relative isolate bg-plum text-bone">
          <WashLayer wash="plum" />
          <div className={`${WRAP} py-32 md:py-[12svh]`}>
            <ol className="grid gap-x-[4vw] gap-y-16 md:grid-cols-2 md:gap-y-[9svh]">
              {episodes.map((ep, i) => (
                <li key={ep.id} data-fade>
                  <Episode id={ep.id} title={ep.title} sizes="(min-width:768px) 44vw, 100vw" priority={i < 2} />
                  <p className="t-note mt-5 text-gold-soft">
                    {ep.show}
                    {ep.date && <span className="text-bone/55"> · {aired(ep.date)}</span>}
                  </p>
                  <h2 className="t-title mt-1 max-w-[36ch]">{ep.title}</h2>
                </li>
              ))}
            </ol>
            <p className="t-lead mt-20 max-w-[36ch] text-bone/85 md:mt-[12svh]">
              More recordings live on{" "}
              <a href={YOUTUBE} target="_blank" rel="noreferrer" className="link-line whitespace-nowrap text-gold-soft">
                his YouTube channel ↗
              </a>
            </p>
          </div>
        </section>
      </main>
    </Shell>
  );
}
