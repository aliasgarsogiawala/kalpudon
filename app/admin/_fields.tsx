"use client";

import { useEffect, useId, useState, useTransition, type ReactNode } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import type { Result } from "./actions";

// The admin's building blocks: plain, clearly labelled fields in the site's type and colours.

export const inputClass =
  "mt-1.5 w-full rounded-md border border-white/15 bg-white/[0.04] px-3 py-2.5 text-[15px] text-bone outline-none transition-colors placeholder:text-stone/50 focus:border-gold";
export const buttonClass =
  "rounded-full bg-gold-soft px-5 py-2.5 text-[14px] font-semibold text-ink transition-opacity hover:opacity-90 disabled:opacity-50";
export const quietButtonClass =
  "rounded-full border border-white/20 px-4 py-2 text-[13px] text-bone/80 transition-colors hover:border-white/40 hover:text-bone disabled:opacity-40";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="t-note text-bone/70">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[13px] text-stone/80">{hint}</span>}
    </label>
  );
}

export function Text({
  label,
  hint,
  value,
  onChange,
  ...rest
}: { label: string; hint?: string; value: string; onChange: (v: string) => void } & Omit<React.ComponentProps<"input">, "value" | "onChange">) {
  return (
    <Field label={label} hint={hint}>
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </Field>
  );
}

export function Area({
  label,
  hint,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <Field label={label} hint={hint}>
      <textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)} className={`${inputClass} leading-[1.6]`} />
    </Field>
  );
}

export function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value as T)} className={inputClass}>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-coal">
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function Tick({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[14px] text-bone/85">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-[var(--gold-soft)]" />
      {label}
    </label>
  );
}

const IMAGE = /\.(jpe?g|png|webp|avif|svg)$/i;

/** Uploads a file to the Blob store from the browser and hands back its link. */
export function Upload({
  label,
  value,
  onChange,
  accept,
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept: string;
  hint?: string;
}) {
  const id = useId();
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    setProgress(0);
    try {
      const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
      const blob = await upload(`cms/uploads/${safe}`, file, {
        access: "public",
        handleUploadUrl: "/admin/upload",
        multipart: file.size > 20 * 1024 * 1024,
        onUploadProgress: (p) => setProgress(Math.round(p.percentage)),
      });
      onChange(blob.url);
    } catch (err) {
      setError((err as Error).message || "The upload didn't finish. Try again.");
    } finally {
      setProgress(null);
    }
  }

  return (
    <div>
      <span className="t-note text-bone/70">{label}</span>
      <div className="mt-1.5 flex flex-wrap items-center gap-3">
        {value && IMAGE.test(value.split("?")[0]) && (
          <span className="relative block size-16 overflow-hidden rounded-md bg-smoke">
            <Image src={value} alt="" fill sizes="64px" unoptimized className="object-cover" />
          </span>
        )}
        <label htmlFor={id} className={`${quietButtonClass} cursor-pointer`}>
          {progress !== null ? `Uploading ${progress}%` : value ? "Replace file" : "Upload file"}
        </label>
        <input id={id} type="file" accept={accept} onChange={pick} disabled={progress !== null} className="sr-only" />
        {value && (
          <a href={value} target="_blank" rel="noreferrer" className="max-w-[260px] truncate text-[13px] text-gold-soft underline underline-offset-4">
            {value.split("/").pop()}
          </a>
        )}
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-[13px] text-stone hover:text-bone">
            Remove file
          </button>
        )}
      </div>
      {hint && <span className="mt-1 block text-[13px] text-stone/80">{hint}</span>}
      {error && <span className="mt-1 block text-[13px] text-[#ff9b8a]">{error}</span>}
    </div>
  );
}

/**
 * Saving one editor's value: catches a dropped connection (rather than losing the page to an error screen) and
 * asks before the tab is closed or reloaded with changes that haven't been saved.
 */
export function useSave<T>(value: T, action: (value: T) => Promise<Result>, onSaved?: () => void) {
  const [saved, setSaved] = useState(() => JSON.stringify(value));
  const [result, setResult] = useState<Result>(null);
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(value) !== saved;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = (check?: () => string | null) =>
    start(async () => {
      setResult(null);
      const problem = check?.();
      if (problem) return setResult({ ok: false, message: problem });
      const snapshot = JSON.stringify(value);
      try {
        const done = await action(value);
        setResult(done);
        if (done?.ok) {
          setSaved(snapshot);
          onSaved?.();
        }
      } catch {
        setResult({ ok: false, message: "Couldn't reach the server, so nothing was saved. Check the connection and save again." });
      }
    });

  return { save, result, pending, dirty };
}

/** Sticky footer with the save button and what happened last. */
export function SaveBar({
  pending,
  result,
  onSave,
  dirty,
  label = "Save",
}: {
  pending: boolean;
  result: Result;
  onSave: () => void;
  dirty?: boolean;
  label?: string;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-10 flex items-center gap-4 border-t border-white/10 bg-ink/90 px-5 py-4 backdrop-blur md:-mx-10 md:px-10">
      <button type="button" onClick={onSave} disabled={pending} className={buttonClass}>
        {pending ? "Saving…" : label}
      </button>
      {result && !(result.ok && dirty) ? (
        <p role="status" className={`text-[14px] ${result.ok ? "text-gold-soft" : "text-[#ff9b8a]"}`}>
          {result.message}
        </p>
      ) : (
        dirty && !pending && <p className="text-[14px] text-bone/55">Unsaved changes</p>
      )}
    </div>
  );
}

export function move<T>(list: T[], at: number, by: -1 | 1): T[] {
  const to = at + by;
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  [next[at], next[to]] = [next[to], next[at]];
  return next;
}
