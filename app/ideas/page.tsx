import type { Metadata } from "next";
import Shell from "../_components/Shell";
import PageHero, { Strip } from "../_components/PageHero";
import { IDEAS } from "../_components/data";
import IdeasIndex from "./IdeasIndex";

export const metadata: Metadata = {
  title: "Ideas",
  description:
    "Essays and talks by Kalpesh Kinariwala: manage risk not returns, inspect what you expect, the widest not the tallest.",
  alternates: { canonical: "/ideas" },
};

// Brief §6: the durable home for the long-form work, independent of social feeds.
export default function IdeasPage() {
  return (
    <Shell>
      <main>
        <PageHero
          label="Ideas"
          tone="violet"
          title={
            <>
              Ideas, written <em>after</em> they worked.
            </>
          }
          intro="Essays and talks, filed under the five things he keeps coming back to."
        >
          <Strip frames={IDEAS.map((i) => ({ src: i.img, alt: "", caption: i.title, n: i.n }))} />
        </PageHero>
        <section className="bg-champagne text-obsidian">
          <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-20">
            <IdeasIndex />
          </div>
        </section>
      </main>
    </Shell>
  );
}
