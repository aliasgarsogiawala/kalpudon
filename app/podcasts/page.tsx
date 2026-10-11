import type { Metadata } from "next";
import Shell from "../_components/Shell";
import PageHero from "../_components/PageHero";
import Episode from "../_components/Episode";
import { WRAP, WashLayer } from "../_components/Sheet";
import { YOUTUBE, aired, byTheme } from "../_components/data";
import { getContent, youtubeId } from "../_lib/content";
import { PERSON_ID, breadcrumbs, jsonLd, pageMeta, url } from "../_lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Podcasts",
  description:
    "Podcasts and interviews with Kalpesh Kinariwala, on Dubai Eye 103.8 and more: real estate, capital markets, leadership and how his businesses were built in the UAE.",
  path: "/podcasts",
  image: "podcasts",
});

// Raj, 2026-10-09: his podcasts on a page of their own. Every episode plays in place; his YouTube
// channel holds the rest. Raj, 2026-10-11: clubbed by theme.
export default async function PodcastsPage() {
  const episodes = (await getContent()).podcasts.flatMap((p) => {
    const id = youtubeId(p.url);
    return id ? [{ ...p, id, theme: p.theme ?? "", headline: p.headline || p.title }] : [];
  });
  let shown = 0; // the first two stills on the page load first
  // Each episode as a video he appears in, so search can show them with the page
  const ld = jsonLd(
    {
      "@type": "ItemList",
      name: "Podcasts and interviews with Kalpesh Kinariwala",
      url: url("/podcasts"),
      itemListElement: episodes.map((ep, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoObject",
          name: ep.headline,
          alternateName: ep.title,
          description: ep.dek || ep.title,
          thumbnailUrl: `https://i.ytimg.com/vi/${ep.id}/hqdefault.jpg`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${ep.id}`,
          url: `https://www.youtube.com/watch?v=${ep.id}`,
          ...(ep.date && { uploadDate: ep.date }),
          genre: ep.theme,
          isPartOf: { "@type": "CreativeWorkSeries", name: ep.show },
          actor: { "@id": PERSON_ID },
        },
      })),
    },
    breadcrumbs([{ name: "Podcasts", path: "/podcasts" }]),
  );
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
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
            {byTheme(episodes).map((g, n) => (
              <section key={g.theme} className={n > 0 ? "mt-24 md:mt-[12svh]" : ""}>
                <h2 data-fade className="t-statement border-t border-white/15 pt-8 text-gold-soft md:pt-[4svh]">
                  {g.theme}
                </h2>
                <ol className="mt-12 grid gap-x-[4vw] gap-y-16 md:mt-[6svh] md:grid-cols-2 md:gap-y-[9svh]">
                  {g.episodes.map((ep) => (
                    <li key={ep.id} data-fade>
                      <Episode id={ep.id} title={ep.title} sizes="(min-width:768px) 44vw, 100vw" priority={shown++ < 2} />
                      <p className="t-note mt-5 text-gold-soft">
                        {ep.show}
                        {ep.date && <span className="text-bone/55"> · {aired(ep.date)}</span>}
                      </p>
                      <h3 className="t-title mt-1 max-w-[36ch]">{ep.headline}</h3>
                      {ep.dek && <p className="t-body mt-2 max-w-[44ch] text-bone/70">{ep.dek}</p>}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
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
