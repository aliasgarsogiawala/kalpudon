"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Episode from "./Episode";
import { YOUTUBE, aired } from "./data";

export type Ep = { id: string; title: string; show: string; date: string };

// The home page's podcasts: the chosen episode large on the left, every episode listed on the right to pick from.
export default function PodcastStage({ episodes }: { episodes: Ep[] }) {
  const [on, setOn] = useState(0);
  const player = useRef<HTMLDivElement>(null);
  const ep = episodes[on];

  // Stacked on phones, the player sits above the list: bring it back into view.
  const pick = (i: number) => {
    setOn(i);
    if (player.current && !window.matchMedia("(min-width: 1024px)").matches) window.__lenis?.scrollTo(player.current, { offset: -100 });
  };
  return (
    <div className="mt-14 flex flex-col gap-12 lg:mt-[6svh] lg:min-h-0 lg:flex-1 lg:flex-row lg:gap-[4vw]">
      {/* The player is sized by the height the heading leaves, so the section stays one screen; the list
          beside it names the episode that is on */}
      <div ref={player} data-fade className="w-full lg:w-[min(54%,calc(48svh*16/9))] lg:shrink-0">
        <Episode key={ep.id} id={ep.id} title={ep.title} sizes="(min-width:1024px) 54vw, 100vw" />
      </div>

      <div data-fade className="flex min-w-0 flex-1 flex-col">
        <ol className="border-t border-white/15">
          {episodes.map((e, i) => (
            <li key={e.id} className="border-b border-white/10">
              <button
                type="button"
                onClick={() => pick(i)}
                aria-pressed={i === on}
                className="group block w-full py-4 text-left lg:py-[1.1svh]"
              >
                <span className={`t-note block transition-colors duration-500 ${i === on ? "text-gold-soft" : "text-bone/50"}`}>
                  {e.show}
                  {e.date && ` · ${aired(e.date)}`}
                </span>
                <span
                  className={`t-body mt-0.5 block font-semibold transition-colors duration-500 ${i === on ? "text-bone" : "text-bone/70 group-hover:text-bone"}`}
                >
                  {e.title}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 lg:mt-[3svh]">
          <Link href="/podcasts" className="t-body link-line w-fit text-gold-soft">
            All podcasts →
          </Link>
          <a href={YOUTUBE} target="_blank" rel="noreferrer" className="t-body link-line w-fit text-bone/80">
            His YouTube channel ↗
          </a>
        </div>
      </div>
    </div>
  );
}
