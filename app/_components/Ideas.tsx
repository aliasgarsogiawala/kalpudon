import Image from "next/image";
import Link from "next/link";
import Giant from "./Giant";
import Sheet, { WRAP } from "./Sheet";
import { getContent } from "../_lib/content";

// Brief §5.5: his frameworks, stated plainly — the teaching layer, and what press will quote.
// The same shape as the thesis: one full screen, the heading across the top, him at the podium
// filling the height, and the three ideas beside him as rows on one grid, each opening the hub.
export default async function Ideas() {
  const ideas = (await getContent()).ideas.slice(0, 3);
  return (
    <Sheet id="ideas" theme="dark" wash="aubergine" className="bg-aubergine text-bone lg:h-[100svh] lg:min-h-[680px]">
      <div className={`${WRAP} flex flex-col pb-28 pt-[132px] md:pb-40 md:pt-[180px] lg:h-full lg:pb-[6svh] lg:pt-[max(100px,13svh)]`}>
        <Giant as="h2" n={13} max={16}>
          Ideas<span className="accent ml-[0.5em]">written after they worked.</span>
        </Giant>

        <div className="mt-20 flex flex-col gap-14 md:mt-28 lg:mt-[6svh] lg:min-h-0 lg:flex-1 lg:flex-row lg:gap-[6vw]">
          <figure className="mx-auto w-[84%] max-w-[520px] lg:mx-0 lg:aspect-[4/5] lg:h-full lg:w-auto lg:max-w-none lg:shrink-0">
            <div data-reveal className="relative aspect-[4/5] rotate-[2deg] bg-bone p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] lg:aspect-auto lg:h-full">
              <div data-reveal-clip className="relative h-full w-full overflow-hidden bg-smoke">
                <Image
                  src="/img/ig-podium.jpg"
                  alt="Kalpesh Kinariwala speaking at Shows of India 2026, Delhi"
                  fill
                  sizes="(min-width:1024px) 34svh, 78vw"
                  className="object-cover object-[50%_34%]"
                />
              </div>
            </div>
          </figure>

          <div className="flex min-w-0 flex-1 flex-col justify-between gap-10 lg:py-[1svh]">
            <ol data-fade className="border-t border-white/10">
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
          </div>
        </div>
      </div>
    </Sheet>
  );
}
