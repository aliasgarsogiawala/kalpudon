import type { Metadata } from "next";
import Shell from "../_components/Shell";
import PageHero, { Strip } from "../_components/PageHero";
import { WRAP, WashLayer } from "../_components/Sheet";
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
          word="Ideas"
          bg={{ src: "/img/ig-note.jpg", pos: "object-[50%_35%]" }}
          script="written after they worked."
          intro="Essays and talks, filed under the five things he keeps coming back to."
        >
          <Strip frames={IDEAS.map((i) => ({ src: i.img, alt: "", caption: i.title, n: i.n }))} />
        </PageHero>
        <section data-theme="dark" className="relative isolate bg-plum text-bone">
          <WashLayer wash="plum" />
          <div className={`${WRAP} py-32 md:py-52`}>
            <IdeasIndex />
          </div>
        </section>
      </main>
    </Shell>
  );
}
