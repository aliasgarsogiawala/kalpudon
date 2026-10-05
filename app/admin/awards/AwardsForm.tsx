"use client";

import { useState, useTransition } from "react";
import type { Award } from "../../_lib/content";
import { saveAwards, type Result } from "../actions";
import { Choice, SaveBar, Text, Tick, Upload, move, quietButtonClass } from "../_fields";

const BLANK: Award = { what: "", who: "", y: String(new Date().getFullYear()), logo: "", img: "", alt: "", focus: "upper", featured: false, home: false };

export default function AwardsForm({ initial }: { initial: Award[] }) {
  const [awards, setAwards] = useState(initial);
  const [result, setResult] = useState<Result>(null);
  const [pending, start] = useTransition();
  const edit = (i: number, patch: Partial<Award>) => setAwards((list) => list.map((a, n) => (n === i ? { ...a, ...patch } : a)));
  const onHome = awards.filter((a) => a.home).length;

  const save = () =>
    start(async () => {
      setResult(null);
      if (onHome > 3) return setResult({ ok: false, message: "Only three awards fit on the home page. Untick one." });
      setResult(await saveAwards(awards));
    });

  return (
    <div className="mt-10 space-y-5">
      {awards.map((a, i) => (
        <section key={i} className="space-y-5 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="grid gap-5 sm:grid-cols-[2fr_2fr_1fr]">
            <Text label="Award" placeholder="Developer of the Year" value={a.what} onChange={(v) => edit(i, { what: v })} />
            <Text label="Given by" placeholder="Forbes Middle East" value={a.who} onChange={(v) => edit(i, { who: v })} />
            <Text label="Year" inputMode="numeric" maxLength={4} value={a.y} onChange={(v) => edit(i, { y: v.replace(/\D/g, "") })} />
          </div>
          <Upload
            label="Logo of the publication (optional)"
            hint="A PNG with a transparent background. The site shows it in white; without one, the name shows."
            accept="image/png,image/webp"
            value={a.logo ?? ""}
            onChange={(logo) => edit(i, { logo })}
          />
          <Upload label="Photograph (optional)" accept="image/jpeg,image/png,image/webp,image/avif" value={a.img} onChange={(img) => edit(i, { img })} />
          {a.img && (
            <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
              <Text label="Describe the photo" hint="For screen readers and search engines." value={a.alt} onChange={(v) => edit(i, { alt: v })} />
              <Choice
                label="Keep in view"
                value={a.focus}
                options={[
                  { value: "top", label: "The top" },
                  { value: "upper", label: "The upper part" },
                  { value: "center", label: "The middle" },
                ]}
                onChange={(focus) => edit(i, { focus })}
              />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Tick label="Lead the press page with its photo" checked={a.featured} onChange={(featured) => edit(i, { featured })} />
            <Tick label="Show on the home page" checked={a.home} onChange={(home) => edit(i, { home })} />
            <div className="ml-auto flex gap-2">
              <button type="button" aria-label="Move up" disabled={i === 0} onClick={() => setAwards(move(awards, i, -1))} className={quietButtonClass}>
                ↑
              </button>
              <button type="button" aria-label="Move down" disabled={i === awards.length - 1} onClick={() => setAwards(move(awards, i, 1))} className={quietButtonClass}>
                ↓
              </button>
              <button type="button" onClick={() => setAwards(awards.filter((_, n) => n !== i))} className={quietButtonClass}>
                Delete award
              </button>
            </div>
          </div>
        </section>
      ))}
      <button type="button" onClick={() => setAwards([...awards, BLANK])} className={quietButtonClass}>
        Add an award
      </button>
      <SaveBar pending={pending} result={result} onSave={save} />
    </div>
  );
}
