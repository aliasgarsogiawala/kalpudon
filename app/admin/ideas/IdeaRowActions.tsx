"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteIdea, moveIdea } from "../actions";
import { quietButtonClass } from "../_fields";

export default function IdeaRowActions({ slug, first, last }: { slug: string; first: boolean; last: boolean }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  const run = (fn: () => Promise<{ ok: boolean; message: string } | null>) =>
    start(async () => {
      const result = await fn();
      setError(result && !result.ok ? result.message : "");
    });
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" aria-label="Move up" disabled={pending || first} onClick={() => run(() => moveIdea(slug, -1))} className={quietButtonClass}>
        ↑
      </button>
      <button type="button" aria-label="Move down" disabled={pending || last} onClick={() => run(() => moveIdea(slug, 1))} className={quietButtonClass}>
        ↓
      </button>
      <Link href={`/admin/ideas/${slug}`} className={quietButtonClass}>
        Edit
      </Link>
      <button
        type="button"
        disabled={pending}
        onClick={() => confirm("Delete this idea? This can't be undone.") && run(() => deleteIdea(slug))}
        className={`${quietButtonClass} hover:border-[#ff9b8a] hover:text-[#ff9b8a]`}
      >
        Delete
      </button>
      {error && <span className="w-full text-[13px] text-[#ff9b8a]">{error}</span>}
    </div>
  );
}
