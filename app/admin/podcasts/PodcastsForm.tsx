"use client";

import { useState, useTransition } from "react";
import type { Podcast } from "../../_lib/content";
import { savePodcasts, type Result } from "../actions";
import { SaveBar, Text, move, quietButtonClass } from "../_fields";

const BLANK: Podcast = { url: "", title: "", show: "", date: "" };

export default function PodcastsForm({ initial }: { initial: Podcast[] }) {
  const [podcasts, setPodcasts] = useState(initial);
  const [result, setResult] = useState<Result>(null);
  const [pending, start] = useTransition();
  const edit = (i: number, patch: Partial<Podcast>) => setPodcasts((list) => list.map((p, n) => (n === i ? { ...p, ...patch } : p)));

  const save = () =>
    start(async () => {
      setResult(null);
      setResult(await savePodcasts(podcasts));
    });

  return (
    <div className="mt-10 space-y-5">
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
      <SaveBar pending={pending} result={result} onSave={save} />
    </div>
  );
}
