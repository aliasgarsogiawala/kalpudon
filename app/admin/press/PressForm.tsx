"use client";

import { useState, useTransition } from "react";
import type { Press } from "../../_lib/content";
import { savePress, type Result } from "../actions";
import { Area, SaveBar, Text, Upload, move, quietButtonClass } from "../_fields";

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/10 pt-8">
      <h2 className="t-title">{title}</h2>
      {hint && <p className="t-body mt-1 text-bone/55">{hint}</p>}
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

function RowTools({ at, count, onMove, onRemove }: { at: number; count: number; onMove: (by: -1 | 1) => void; onRemove: () => void }) {
  return (
    <div className="flex gap-2">
      <button type="button" aria-label="Move up" disabled={at === 0} onClick={() => onMove(-1)} className={quietButtonClass}>
        ↑
      </button>
      <button type="button" aria-label="Move down" disabled={at === count - 1} onClick={() => onMove(1)} className={quietButtonClass}>
        ↓
      </button>
      <button type="button" onClick={onRemove} className={quietButtonClass}>
        Remove
      </button>
    </div>
  );
}

export default function PressForm({ initial }: { initial: Press }) {
  const [press, setPress] = useState(initial);
  const [result, setResult] = useState<Result>(null);
  const [pending, start] = useTransition();
  const save = () =>
    start(async () => {
      setResult(null);
      setResult(await savePress(press));
    });

  const setBio = (bio: string[]) => setPress((p) => ({ ...p, bio }));
  const setFacts = (facts: Press["facts"]) => setPress((p) => ({ ...p, facts }));
  const setKit = (kit: Press["kit"]) => setPress((p) => ({ ...p, kit }));

  return (
    <div className="mt-10 space-y-10">
      <Section title="Biography" hint="The first paragraph is the large opening line; the rest sit beneath it.">
        {press.bio.map((para, i) => (
          <div key={i} className="space-y-2">
            <Area
              label={i === 0 ? "Opening line" : `Paragraph ${i + 1}`}
              value={para}
              onChange={(v) => setBio(press.bio.map((b, n) => (n === i ? v : b)))}
              rows={i === 0 ? 3 : 5}
            />
            {i > 0 && (
              <RowTools at={i} count={press.bio.length} onMove={(by) => setBio(move(press.bio, i, by))} onRemove={() => setBio(press.bio.filter((_, n) => n !== i))} />
            )}
          </div>
        ))}
        <button type="button" onClick={() => setBio([...press.bio, ""])} className={quietButtonClass}>
          Add a paragraph
        </button>
      </Section>

      <Section title="Fact sheet">
        {press.facts.map((f, i) => (
          <div key={i} className="grid gap-3 sm:grid-cols-[1fr_2fr]">
            <Text label="Label" value={f.k} onChange={(v) => setFacts(press.facts.map((x, n) => (n === i ? { ...x, k: v } : x)))} />
            <Text label="Fact" value={f.v} onChange={(v) => setFacts(press.facts.map((x, n) => (n === i ? { ...x, v } : x)))} />
            <div className="sm:col-span-2">
              <RowTools at={i} count={press.facts.length} onMove={(by) => setFacts(move(press.facts, i, by))} onRemove={() => setFacts(press.facts.filter((_, n) => n !== i))} />
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setFacts([...press.facts, { k: "", v: "" }])} className={quietButtonClass}>
          Add a fact
        </button>
      </Section>

      <Section title="Media kit" hint="Files journalists can download from the press page: photographs, logos, the full biography.">
        {press.kit.map((f, i) => (
          <div key={i} className="space-y-3 rounded-lg border border-white/10 p-4">
            <Text label="Name" placeholder="Portrait, high resolution" value={f.label} onChange={(v) => setKit(press.kit.map((x, n) => (n === i ? { ...x, label: v } : x)))} />
            <Upload
              label="File"
              accept="image/jpeg,image/png,image/webp,application/pdf,application/zip"
              value={f.url}
              onChange={(url) => setKit(press.kit.map((x, n) => (n === i ? { ...x, url } : x)))}
            />
            <RowTools at={i} count={press.kit.length} onMove={(by) => setKit(move(press.kit, i, by))} onRemove={() => setKit(press.kit.filter((_, n) => n !== i))} />
          </div>
        ))}
        <button type="button" onClick={() => setKit([...press.kit, { label: "", url: "" }])} className={quietButtonClass}>
          Add a file
        </button>
      </Section>

      <SaveBar pending={pending} result={result} onSave={save} />
    </div>
  );
}
