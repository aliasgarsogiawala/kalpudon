"use client";

import { useState } from "react";
import Image from "next/image";
import { IDEAS, PILLARS, type Pillar } from "../_components/data";

export default function IdeasIndex() {
  const [pillar, setPillar] = useState<Pillar | null>(null);
  const shown = pillar ? IDEAS.filter((i) => i.category === pillar) : IDEAS;
  const chip = (on: boolean) =>
    `border px-4 py-2 text-[15px] transition-colors duration-300 ${
      on ? "border-obsidian bg-obsidian text-bone" : "border-obsidian/25 text-obsidian/70 hover:border-obsidian"
    }`;

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by pillar">
        <button className={chip(pillar === null)} aria-pressed={pillar === null} onClick={() => setPillar(null)}>
          All
        </button>
        {PILLARS.map((p) => (
          <button key={p} className={chip(pillar === p)} aria-pressed={pillar === p} onClick={() => setPillar(p)}>
            {p}
          </button>
        ))}
      </div>

      <ol className="mt-14">
        {shown.map((idea) => (
          <li key={idea.slug} className="grid grid-cols-12 items-center gap-x-6 gap-y-4 border-t border-obsidian/25 py-8 last:border-b md:py-10">
            <span className="display-sm col-span-2 text-[20px] text-obsidian/50 md:col-span-1">{idea.n}</span>
            <div className="col-span-10 md:col-span-7">
              <h2 className="display text-[clamp(24px,3vw,54px)]">{idea.title}</h2>
              <p className="mt-3 max-w-[560px] text-[16px] leading-[1.6] text-obsidian/65">{idea.dek}</p>
            </div>
            <div className="col-span-10 col-start-3 flex flex-wrap gap-x-6 gap-y-1 text-[14px] md:col-span-2 md:col-start-auto md:flex-col">
              <span className="w-fit bg-obsidian px-3 py-1 font-medium text-bone">{idea.category}</span>
              <span className="text-obsidian/60">{idea.format}</span>
              <span className="text-obsidian/60">
                {idea.date ? new Date(idea.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "In preparation"}
              </span>
            </div>
            <div className="relative col-span-2 hidden aspect-[3/4] w-full max-w-[150px] justify-self-end overflow-hidden md:block">
              <Image src={idea.img} alt="" fill sizes="150px" className="object-cover" />
            </div>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="border-y border-obsidian/25 py-10 text-[17px] text-obsidian/60">Nothing published under {pillar} yet.</li>
        )}
      </ol>
    </>
  );
}
