import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "../../_components/Shell";
import { WRAP, WashLayer } from "../../_components/Sheet";
import { SITE_URL } from "../../_components/data";
import { getContent, published, type Idea } from "../../_lib/content";

// One published piece from the Ideas hub (brief §6): the flagship long-form lives here, not on social
// feeds. Pieces still in preparation have no page.

async function find(slug: string): Promise<Idea | undefined> {
  return published((await getContent()).ideas).find((i) => i.slug === slug);
}

export async function generateStaticParams() {
  return published((await getContent()).ideas).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ideas/[slug]">): Promise<Metadata> {
  const idea = await find((await params).slug);
  if (!idea) return {};
  return {
    title: idea.title,
    description: idea.dek,
    alternates: { canonical: `/ideas/${idea.slug}` },
    openGraph: { type: "article", title: idea.title, description: idea.dek, publishedTime: idea.date },
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
  const ld = {
    "@context": "https://schema.org",
    "@type": idea.format === "Video" ? "VideoObject" : "Article",
    ...(idea.format === "Video" ? { name: idea.title, uploadDate: idea.date } : { headline: idea.title, datePublished: idea.date }),
    description: idea.dek,
    author: { "@type": "Person", name: "Kalpesh Kinariwala", url: SITE_URL },
    url: `${SITE_URL}/ideas/${idea.slug}`,
  };

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
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
