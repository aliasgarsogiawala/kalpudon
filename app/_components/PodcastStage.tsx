"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Episode from "./Episode";
import { YOUTUBE } from "./data";

export type Ep = { id: string; title: string; theme: string; headline: string; dek: string };

// The home page's podcasts: the chosen episode large on the left, every episode listed on the right under
// its theme to pick from.
export default function PodcastStage({ groups }: { groups: { theme: string; episodes: Ep[] }[] }) {
  const episodes = groups.flatMap((g) => g.episodes);
  const [on, setOn] = useState(episodes[0].id);
  const player = useRef<HTMLDivElement>(null);
  const ep = episodes.find((e) => e.id === on) ?? episodes[0];

  // Stacked on phones, the player sits above the list: bring it back into view.
  const pick = (id: string) => {
    setOn(id);
    if (player.current && !window.matchMedia("(min-width: 1024px)").matches) window.__lenis?.scrollTo(player.current, { offset: -100 });
  };
  return (
    <div className="mt-14 flex flex-col gap-12 lg:mt-[6svh] lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[min(54%,calc(48svh*16/9))_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-[4vw] lg:gap-y-0">
      {/* The player is sized by the height the heading leaves, so the section stays one screen; the list
          beside it names the episode that is on, and the links sit under the player to leave it the height */}
      <div ref={player} data-fade className="w-full">
        <Episode key={ep.id} id={ep.id} title={ep.title} sizes="(min-width:1024px) 54vw, 100vw" />
      </div>

      <div data-fade className="min-w-0 lg:row-span-2">
        {groups.map((g) => (
          <section key={g.theme} className="border-t border-white/15 pb-4 pt-5 lg:pb-[1svh] lg:pt-[1.6svh]">
            <h3 className="t-body font-semibold text-gold-soft">{g.theme}</h3>
            <ol>
              {g.episodes.map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => pick(e.id)}
                    aria-pressed={e.id === on}
                    className="group block w-full py-2.5 text-left lg:py-[0.5svh]"
                  >
                    <span
                      className={`t-body block font-semibold transition-colors duration-500 ${e.id === on ? "text-bone" : "text-bone/70 group-hover:text-bone"}`}
                    >
                      {e.headline}
                    </span>
                    {e.dek && (
                      <span className={`t-note block transition-colors duration-500 ${e.id === on ? "text-bone/75" : "text-bone/50"}`}>
                        {e.dek}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-x-8 gap-y-3 lg:col-start-1 lg:row-start-2 lg:mt-[3svh] lg:self-start">
        <Link href="/podcasts" className="t-body link-line w-fit text-gold-soft">
          All podcasts →
        </Link>
        <a href={YOUTUBE} target="_blank" rel="noreferrer" className="t-body link-line w-fit text-bone/80">
          YouTube channel ↗
        </a>
      </div>
    </div>
  );
}
