"use client";

import { useState } from "react";
import type { Podcast } from "../../_lib/content";
import { savePodcasts } from "../actions";
import { THEMES } from "../../_components/data";
import { SaveBar, Text, move, quietButtonClass, useSave } from "../_fields";

const BLANK: Podcast = { url: "", title: "", show: "", date: "", theme: "", headline: "", dek: "" };

export default function PodcastsForm({ initial }: { initial: Podcast[] }) {
  const [podcasts, setPodcasts] = useState(initial);
  const { save, result, pending, dirty } = useSave(podcasts, savePodcasts);
  const edit = (i: number, patch: Partial<Podcast>) => setPodcasts((list) => list.map((p, n) => (n === i ? { ...p, ...patch } : p)));

  // Every theme in use, so a new one (events, culture) is offered once it has been typed in
  const themes = [...new Set([...THEMES, ...podcasts.map((p) => p.theme ?? "").filter(Boolean)])];

  return (
    <div className="mt-10 space-y-5">
      <datalist id="podcast-themes">
        {themes.map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>
      {podcasts.map((p, i) => (
        <section key={i} className="space-y-5 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <Text
            label="YouTube link"
            placeholder="https://youtu.be/…"
            hint="Copy it from Share on the YouTube video."
            inputMode="url"
            value={p.url}
            onChange={(v) => edit(i, { url: v })}
          />
          <Text label="Episode title" placeholder="Paste it as YouTube shows it" value={p.title} onChange={(v) => edit(i, { title: v })} />
          <Text
            label="Theme"
            hint="Episodes are grouped under their theme. Pick one, or type a new one, e.g. Events & Culture."
            list="podcast-themes"
            placeholder="Markets & Investing"
            value={p.theme ?? ""}
            onChange={(v) => edit(i, { theme: v })}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Text
              label="Headline"
              hint="Shown on the site in place of the YouTube title."
              placeholder="Markets Don’t Stop at Borders"
              value={p.headline ?? ""}
              onChange={(v) => edit(i, { headline: v })}
            />
            <Text
              label="One line about it"
              placeholder="Global trade, risk and long-term opportunity."
              value={p.dek ?? ""}
              onChange={(v) => edit(i, { dek: v })}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
            <Text label="Show" placeholder="Beyond The Blueprint" value={p.show} onChange={(v) => edit(i, { show: v })} />
            <Text label="Aired (optional)" type="date" value={p.date} onChange={(v) => edit(i, { date: v })} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" aria-label="Move up" disabled={i === 0} onClick={() => setPodcasts(move(podcasts, i, -1))} className={quietButtonClass}>
              ↑
            </button>
            <button
              type="button"
              aria-label="Move down"
              disabled={i === podcasts.length - 1}
              onClick={() => setPodcasts(move(podcasts, i, 1))}
              className={quietButtonClass}
            >
              ↓
            </button>
            <button type="button" onClick={() => setPodcasts(podcasts.filter((_, n) => n !== i))} className={quietButtonClass}>
              Delete episode
            </button>
          </div>
        </section>
      ))}
      <button type="button" onClick={() => setPodcasts([BLANK, ...podcasts])} className={quietButtonClass}>
        Add an episode at the top
      </button>
      <SaveBar pending={pending} result={result} dirty={dirty} onSave={() => save()} />
    </div>
  );
}
