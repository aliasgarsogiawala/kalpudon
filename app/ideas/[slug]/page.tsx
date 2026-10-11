import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "../../_components/Shell";
import { WRAP, WashLayer } from "../../_components/Sheet";
import { getContent, published, youtubeId, type Idea } from "../../_lib/content";
import { NAME, PERSON_ID, breadcrumbs, jsonLd, pageMeta, person, shareImage, url } from "../../_lib/seo";

// One published piece from the Ideas hub (brief §6): the flagship long-form lives here, not on social
// feeds. Pieces still in preparation have no page.

async function find(slug: string): Promise<Idea | undefined> {
  return published((await getContent()).ideas).find((i) => i.slug === slug);
}

export async function generateStaticParams() {
  return published((await getContent()).ideas).map((i) => ({ slug: i.slug }));
}

// The summary, or else the opening of the piece, cut to a search-result length
const summary = (idea: Idea) => {
  const text = (idea.dek || idea.body || `${idea.format === "Video" ? "A talk" : "An essay"} by ${NAME}.`).replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157).replace(/\s+\S*$/, "")}…` : text;
};

export async function generateMetadata({ params }: PageProps<"/ideas/[slug]">): Promise<Metadata> {
  const idea = await find((await params).slug);
  if (!idea) return {};
  const meta = pageMeta({ title: idea.title, description: summary(idea), path: `/ideas/${idea.slug}`, image: "ideas" });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: idea.date, authors: [url("/")], section: idea.category },
  };
}

// YouTube and Vimeo links become their players; an uploaded file plays in place.
function player(url: string): { kind: "frame" | "file"; src: string } | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^(www|m)\./, "");
    const yt = host === "youtube.com" ? (u.searchParams.get("v") ?? u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1]) : host === "youtu.be" ? u.pathname.slice(1) : null;
    if (yt) return { kind: "frame", src: `https://www.youtube-nocookie.com/embed/${yt}` };
    const vimeo = host === "vimeo.com" ? u.pathname.match(/^\/(\d+)/)?.[1] : null;
    if (vimeo) return { kind: "frame", src: `https://player.vimeo.com/video/${vimeo}` };
    if (host === "player.vimeo.com") return { kind: "frame", src: url };
    if (/\.(mp4|webm|mov)$/i.test(u.pathname)) return { kind: "file", src: url };
  } catch {}
  return null;
}

const paragraphs = (body: string) =>
  body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export default async function IdeaPage({ params }: PageProps<"/ideas/[slug]">) {
  const idea = await find((await params).slug);
  if (!idea) notFound();
  const video = idea.format === "Video" && idea.video ? player(idea.video) : null;
  const date = new Date(`${idea.date}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const yt = idea.format === "Video" ? youtubeId(idea.video) : null;
  const ld = jsonLd(
    {
      "@type": idea.format === "Video" ? "VideoObject" : "Article",
      ...(idea.format === "Video"
        ? {
            name: idea.title,
            uploadDate: idea.date,
            thumbnailUrl: yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : url(shareImage("ideas").url),
            ...(video?.kind === "frame" ? { embedUrl: video.src } : video ? { contentUrl: video.src } : {}),
          }
        : { headline: idea.title, datePublished: idea.date, dateModified: idea.date, image: url(shareImage("ideas").url), articleSection: idea.category }),
      description: summary(idea),
      inLanguage: "en",
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      mainEntityOfPage: url(`/ideas/${idea.slug}`),
      url: url(`/ideas/${idea.slug}`),
    },
    person(),
    breadcrumbs([
      { name: "Ideas", path: "/ideas" },
      { name: idea.title, path: `/ideas/${idea.slug}` },
    ]),
  );

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <main>
        <article data-theme="dark" className="relative isolate min-h-[100svh] bg-plum text-bone">
          <WashLayer wash="plum" />
          <div className={`${WRAP} pb-32 pt-[140px] md:pb-[12svh] md:pt-[max(140px,18svh)]`}>
            <div className="max-w-[900px]">
              <Link href="/ideas" className="t-note link-line text-bone/60">
                ← All ideas
              </Link>
              <p className="t-note mt-10 text-gold-soft">
                {idea.category} · {idea.format} · {date}
              </p>
              <h1 className="t-statement mt-4 text-[clamp(40px,min(5vw,9svh),88px)]">{idea.title}</h1>
              {idea.dek && <p className="t-lead mt-6 max-w-[40ch] text-bone/85">{idea.dek}</p>}
            </div>

            {video && (
              <div className="mt-14 aspect-video w-full max-w-[1100px] overflow-hidden bg-coal md:mt-[7svh]">
                {video.kind === "frame" ? (
                  <iframe
                    src={video.src}
                    title={idea.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="size-full"
                  />
                ) : (
                  <video src={video.src} controls playsInline preload="metadata" className="size-full" />
                )}
              </div>
            )}
            {idea.format === "Video" && idea.video && !video && (
              <a href={idea.video} target="_blank" rel="noreferrer" className="t-body link-line mt-10 inline-block text-gold-soft">
                Watch the talk →
              </a>
            )}

            {idea.body && (
              <div className="mt-14 max-w-[66ch] space-y-6 border-t border-white/10 pt-10 md:mt-[7svh]">
                {paragraphs(idea.body).map((p, i) => (
                  <p key={i} className="t-body whitespace-pre-line text-[17px] text-bone/85">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </article>
      </main>
    </Shell>
  );
}
