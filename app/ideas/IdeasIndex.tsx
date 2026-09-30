"use client";

import { useState } from "react";
import Link from "next/link";
import { PILLARS, type Pillar } from "../_components/data";
import type { Idea } from "../_lib/content";

// Every row on one grid: the pillar, the title with its line, then the format and date, each starting
// on the same line as its neighbours.
export default function IdeasIndex({ ideas }: { ideas: Idea[] }) {
  const [pillar, setPillar] = useState<Pillar | null>(null);
  const shown = pillar ? ideas.filter((i) => i.category === pillar) : ideas;
  const chip = (on: boolean) =>
    `t-body transition-colors duration-300 ${on ? "text-gold-soft underline decoration-gold underline-offset-[6px]" : "text-bone/60 hover:text-bone"}`;

  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2" role="group" aria-label="Filter by pillar">
        <span className="t-note text-bone/50">Filed under</span>
        <button className={chip(pillar === null)} aria-pressed={pillar === null} onClick={() => setPillar(null)}>
          All
        </button>
        {PILLARS.map((p) => (
          <button key={p} className={chip(pillar === p)} aria-pressed={pillar === p} onClick={() => setPillar(p)}>
            {p}
          </button>
        ))}
      </div>

      <ol className="mt-12 border-t border-white/10 md:mt-[5svh]">
        {shown.map((idea) => (
          <li key={idea.slug} className="grid gap-3 border-b border-white/10 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-[3.4svh]">
            <p className="t-note text-gold-soft md:col-span-3">{idea.category}</p>
            <div className="md:col-span-6">
              <h2 className="t-title">
                {idea.date ? (
                  <Link href={`/ideas/${idea.slug}`} className="transition-colors hover:text-gold-soft">
                    {idea.title}
                  </Link>
                ) : (
                  idea.title
                )}
              </h2>
              <p className="t-body mt-2 max-w-[52ch] text-bone/70">{idea.dek}</p>
            </div>
            <p className="t-note text-bone/60 md:col-span-3 md:text-right">
              {idea.format},{" "}
              {idea.date ? new Date(`${idea.date}T12:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "in preparation"}
            </p>
          </li>
        ))}
        {shown.length === 0 && <li className="t-body py-10 text-bone/60">Nothing published under {pillar} yet.</li>}
      </ol>
    </>
  );
}
