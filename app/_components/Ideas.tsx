import Link from "next/link";
import Giant from "./Giant";
import Sheet from "./Sheet";
import Scene, { Backdrop, ScenePhoto } from "./Scene";
import { getContent } from "../_lib/content";

// Brief §5.5: his frameworks, stated plainly — the teaching layer, and what press will quote.
// The HOP opening's shape (Scene.tsx): the heading across the top, the three ideas on the left as rows on
// one grid, each opening the hub, and him at the podium on the right, over the light of that stage.
export default async function Ideas() {
  const ideas = (await getContent()).ideas.slice(0, 3);
  return (
    <Sheet id="ideas" theme="dark" wash="aubergine" className="bg-aubergine text-bone">
      <Scene
        backdrop={<Backdrop src="/img/ig-podium-2.jpg" pos="object-[50%_30%]" soft />}
        heading={
          <Giant as="h2" n={13} max={16}>
            Ideas<span className="accent ml-[0.5em]">written after they worked.</span>
          </Giant>
        }
        figure={<ScenePhoto src="/img/ig-podium.jpg" alt="Kalpesh Kinariwala speaking at Shows of India 2026, Delhi" pos="object-[50%_34%]" />}
      >
        <ol data-fade className="border-t border-white/15">
          {ideas.map((idea) => (
            <li key={idea.slug} className="border-b border-white/10">
              <Link href={idea.date ? `/ideas/${idea.slug}` : "/ideas"} className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8 lg:py-[2.6svh]">
                <span className="t-note text-gold-soft md:col-span-3">{idea.category}</span>
                <span className="md:col-span-9">
                  <span className="t-title block transition-colors duration-500 group-hover:text-gold-soft">{idea.title}</span>
                  <span className="t-body mt-1 block text-bone/70">{idea.dek}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link href="/ideas" className="t-body link-line w-fit text-gold-soft">
          All ideas and talks →
        </Link>
      </Scene>
    </Sheet>
  );
}
