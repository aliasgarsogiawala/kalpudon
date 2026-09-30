import type { Metadata } from "next";
import Shell from "../_components/Shell";
import PageHero from "../_components/PageHero";
import { WRAP, WashLayer } from "../_components/Sheet";
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
          bg={{ src: "/img/kk-book-bg.jpg", pos: "object-[70%_30%]" }}
          line="written after they worked."
          intro="Essays and talks, filed under the five things he keeps coming back to."
        />
        <section data-theme="dark" className="relative isolate bg-plum text-bone">
          <WashLayer wash="plum" />
          <div className={`${WRAP} flex min-h-[100svh] flex-col justify-center py-32 md:py-[10svh]`}>
            <IdeasIndex />
          </div>
        </section>
      </main>
    </Shell>
  );
}
