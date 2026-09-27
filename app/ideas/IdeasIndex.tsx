"use client";

import { useState } from "react";
import Image from "next/image";
import { IDEAS, PILLARS, type Pillar } from "../_components/data";

export default function IdeasIndex() {
  const [pillar, setPillar] = useState<Pillar | null>(null);
  const shown = pillar ? IDEAS.filter((i) => i.category === pillar) : IDEAS;
  const chip = (on: boolean) =>
    `py-1 text-[15px] transition-colors duration-300 ${on ? "text-gold-soft underline decoration-gold underline-offset-[6px]" : "text-bone/60 hover:text-bone"}`;

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2" role="group" aria-label="Filter by pillar">
        <span className="text-[15px] text-bone/40">Filed under</span>
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
          <li key={idea.slug} className="grid grid-cols-12 items-center gap-x-6 gap-y-4 py-8 md:py-10">
            <div className="col-span-12 md:col-span-8">
              <h2 className="serif text-[clamp(34px,4vw,72px)] leading-[0.98]">{idea.title}</h2>
              <p className="mt-4 max-w-[560px] text-[16px] leading-[1.65] text-bone/70">{idea.dek}</p>
            </div>
            <div className="col-span-12 flex flex-wrap gap-x-6 gap-y-1 text-[14px] md:col-span-2 md:flex-col">
              <span className="eyebrow text-[11px] text-gold">{idea.category}</span>
              <span className="text-bone/60">{idea.format}</span>
              <span className="text-bone/60">
                {idea.date ? new Date(idea.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "In preparation"}
              </span>
            </div>
            <div className="relative col-span-2 hidden aspect-[4/5] w-full max-w-[160px] justify-self-end overflow-hidden md:block">
              <Image src={idea.img} alt="" fill sizes="160px" className="object-cover" />
            </div>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="py-10 text-[17px] text-bone/60">Nothing published under {pillar} yet.</li>
        )}
      </ol>
    </>
  );
}
