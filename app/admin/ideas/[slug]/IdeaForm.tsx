"use client";

import { useState, useTransition } from "react";
import { PILLARS } from "../../../_components/data";
import type { Idea } from "../../../_lib/content";
import { saveIdea, type Result } from "../../actions";
import { Area, Choice, SaveBar, Text, Upload } from "../../_fields";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const today = () => new Date().toISOString().slice(0, 10);

export default function IdeaForm({ initial, originalSlug }: { initial: Idea; originalSlug: string | null }) {
  const [idea, setIdea] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(originalSlug));
  const [result, setResult] = useState<Result>(null);
  const [pending, start] = useTransition();
  const set = <K extends keyof Idea>(key: K, value: Idea[K]) => setIdea((i) => ({ ...i, [key]: value }));

  const save = () =>
    start(async () => {
      setResult(null);
      setResult(await saveIdea(originalSlug, idea));
    });

  return (
    <div className="mt-8 space-y-6">
      <Text
        label="Title"
        value={idea.title}
        onChange={(v) => setIdea((i) => ({ ...i, title: v, slug: slugTouched ? i.slug : slugify(v) }))}
      />
      <Text
        label="Web address"
        hint={`kalpeshkinariwala.com/ideas/${idea.slug || "…"}`}
        value={idea.slug}
        onChange={(v) => {
          setSlugTouched(true);
          set("slug", slugify(v));
        }}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <Choice
          label="Pillar"
          value={idea.category}
          options={PILLARS.map((p) => ({ value: p, label: p }))}
          onChange={(v) => set("category", v)}
        />
        <Choice
          label="Format"
          value={idea.format}
          options={[
            { value: "Article", label: "Article" },
            { value: "Video", label: "Video" },
          ]}
          onChange={(v) => set("format", v)}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Choice
          label="Status"
          value={idea.date ? "live" : "prep"}
          options={[
            { value: "prep", label: "In preparation (listed, no page yet)" },
            { value: "live", label: "Published (has its own page)" },
          ]}
          onChange={(v) => set("date", v === "live" ? idea.date || today() : "")}
        />
        {idea.date && <Text label="Publication date" type="date" value={idea.date} onChange={(v) => set("date", v)} />}
      </div>
      <Area label="Summary" hint="One or two sentences, shown in the lists." value={idea.dek} onChange={(v) => set("dek", v)} rows={3} />
      {idea.format === "Article" ? (
        <Area
          label="Article"
          hint="Leave a blank line between paragraphs."
          value={idea.body}
          onChange={(v) => set("body", v)}
          rows={16}
        />
      ) : (
        <>
          <Text
            label="Video link"
            hint="A YouTube or Vimeo link, or upload the file below."
            placeholder="https://www.youtube.com/watch?v=…"
            value={idea.video}
            onChange={(v) => set("video", v)}
          />
          <Upload label="Or upload the video (MP4)" accept="video/mp4" value={idea.video} onChange={(url) => set("video", url)} />
          <Area label="Notes under the video (optional)" value={idea.body} onChange={(v) => set("body", v)} rows={6} />
        </>
      )}
      <SaveBar pending={pending} result={result} onSave={save} label={originalSlug ? "Save changes" : "Add idea"} />
    </div>
  );
}
