import type { Metadata } from "next";
import Shell from "../_components/Shell";
import PageHero from "../_components/PageHero";
import { WRAP, WashLayer } from "../_components/Sheet";
import { getContent } from "../_lib/content";
import IdeasIndex from "./IdeasIndex";
import { breadcrumbs, jsonLd, pageMeta } from "../_lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Ideas",
  description:
    "Essays and talks by Kalpesh Kinariwala: manage risk not returns, inspect what you expect, the widest not the tallest.",
  path: "/ideas",
  image: "ideas",
});

// Brief §6: the durable home for the long-form work, independent of social feeds.
export default async function IdeasPage() {
  const { ideas } = await getContent();
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs([{ name: "Ideas", path: "/ideas" }])) }} />
      <main>
        <PageHero
          word="Ideas"
          photo={{ src: "/img/solo-ground.jpg", alt: "Kalpesh Kinariwala presenting a Pantheon project", pos: "object-[50%_30%]" }}
          line="written after they worked."
          intro="Essays and talks, filed under the five things he keeps coming back to."
        />
        <section data-theme="dark" className="relative isolate bg-plum text-bone">
          <WashLayer wash="plum" />
          <div className={`${WRAP} flex min-h-[100svh] flex-col justify-center py-32 md:py-[10svh]`}>
            <IdeasIndex ideas={ideas} />
          </div>
        </section>
      </main>
    </Shell>
  );
}
