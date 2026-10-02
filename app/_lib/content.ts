import "server-only";
import { randomUUID } from "node:crypto";
import { del, get, list, put, type ListBlobResultBlob } from "@vercel/blob";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { z } from "zod";
import { IDEAS, PILLARS, PRESS_BIO, PRESS_FACTS, RECOGNITION } from "../_components/data";

// The light CMS (brief §6, §8): everything the team edits lives in one JSON document in Vercel Blob.
// Until the first save from /admin, the site shows the defaults below (the content it launched with).

// Every save is a new file that is never overwritten: Blob serves an overwritten file stale for several
// seconds, but a new path and the store's listing are up to date at once. The newest file is the live
// content; the last KEEP are kept as history.
const DIR = "cms/content/";
const KEEP = 30;
const TAG = "cms";

const text = (max: number) => z.string().trim().max(max);
// A site path ("/img/...") or an https link (uploads land on the Blob store's https URL)
const link = z
  .string()
  .trim()
  .max(1000)
  .refine((v) => v === "" || v.startsWith("/") || v.startsWith("https://"), "Use a link that starts with https://");

export const FOCUS = { top: "object-[50%_0%]", upper: "object-[50%_25%]", center: "object-center" } as const;

export const IdeaSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Add a web address")
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase words joined by hyphens, e.g. manage-risk-not-returns"),
  title: text(140).min(1, "Add a title"),
  format: z.enum(["Article", "Video"]),
  category: z.enum(PILLARS),
  // Empty = in preparation (listed, but no page of its own yet)
  date: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date")]),
  dek: text(400),
  body: text(60000),
  video: link,
});

export const AwardSchema = z
  .object({
    what: text(160).min(1, "Name the award"),
    who: text(120).min(1, "Say who gave it"),
    y: z.string().trim().regex(/^\d{4}$/, "Year as four digits"),
    img: link,
    alt: text(200),
    focus: z.enum(["top", "upper", "center"]),
    featured: z.boolean(),
    home: z.boolean(),
  })
  .refine((a) => !a.featured || a.img, { message: "Add a photo to show an award in the press page's photographs", path: ["img"] });

export const PressSchema = z.object({
  bio: z.array(text(2000).min(1)).min(1, "Keep at least the opening line").max(8),
  facts: z.array(z.object({ k: text(80).min(1, "Label"), v: text(300).min(1, "Value") })).max(20),
  kit: z.array(z.object({ label: text(120).min(1, "Name the file"), url: link.refine((v) => v !== "", "Upload the file") })).max(30),
});

export const ContentSchema = z.object({
  ideas: z
    .array(IdeaSchema)
    .max(300)
    .refine((ideas) => new Set(ideas.map((i) => i.slug)).size === ideas.length, "Two ideas share a web address"),
  press: PressSchema,
  awards: z.array(AwardSchema).max(60),
  savedAt: z.string().optional(),
});

export type Idea = z.infer<typeof IdeaSchema>;
export type Award = z.infer<typeof AwardSchema>;
export type Press = z.infer<typeof PressSchema>;
export type Content = z.infer<typeof ContentSchema>;

// Photographs the launch awards already had on the press page
const LAUNCH_PHOTOS: Record<string, Pick<Award, "img" | "alt" | "focus">> = {
  "The Ultimate Realty Awards": {
    img: "/img/kk-award-solo.jpg",
    alt: "Kalpesh Kinariwala at The Ultimate Realty Awards, where Pantheon Development was named Affordable Luxury Developer of the Year",
    focus: "top",
  },
  "Shows of India": { img: "/img/ig-podium-2.jpg", alt: "Kalpesh Kinariwala speaking at Shows of India 2026, Delhi", focus: "upper" },
};
const ON_HOME = ["Entrepreneur Middle East", "Forbes Middle East", "Shows of India"];

export const DEFAULT_CONTENT: Content = {
  ideas: IDEAS.map((i) => ({
    slug: i.slug,
    title: i.title,
    format: i.format,
    category: i.category,
    date: i.date ?? "",
    dek: i.dek,
    body: "",
    video: "",
  })),
  press: { bio: [...PRESS_BIO], facts: PRESS_FACTS.map((f) => ({ ...f })), kit: [] },
  awards: RECOGNITION.map((r) => ({
    what: r.what,
    who: r.who,
    y: r.y,
    img: LAUNCH_PHOTOS[r.who]?.img ?? "",
    alt: LAUNCH_PHOTOS[r.who]?.alt ?? "",
    focus: LAUNCH_PHOTOS[r.who]?.focus ?? "upper",
    featured: r.who in LAUNCH_PHOTOS,
    home: ON_HOME.includes(r.who),
  })),
};

const configured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

type Version = { data: unknown; pathname: string };

// Oldest first; names start with a zero-padded timestamp, so they sort in save order
async function versions(): Promise<ListBlobResultBlob[]> {
  const all: ListBlobResultBlob[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: DIR, cursor, limit: 1000 });
    all.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return all.sort((a, b) => a.pathname.localeCompare(b.pathname));
}

async function read(blob: ListBlobResultBlob): Promise<Version> {
  const res = await get(blob.url, { access: "public" }); // a version never changes, so any cached copy is right
  if (!res || res.statusCode !== 200) throw new Error(`Could not read ${blob.pathname}`);
  return { data: JSON.parse(await new Response(res.stream).text()), pathname: blob.pathname };
}

async function readLatest(): Promise<Version | null> {
  if (!configured()) return null;
  const latest = (await versions()).at(-1);
  return latest ? read(latest) : null;
}

function parse(data: unknown): Content {
  const parsed = ContentSchema.safeParse(data);
  if (!parsed.success) {
    console.error("[cms] stored content failed validation; showing the defaults", parsed.error.issues.slice(0, 5));
    return DEFAULT_CONTENT;
  }

  // Saved content from before the terminology update still uses the old sector names. Normalize it
  // at the content boundary so the public site and admin editor agree; the next save persists it.
  const currentTerms = (value: string) =>
    value
      .replace(/world(?:’|')s leading distributor of iodine/gi, "world’s leading mining chemical distributor")
      .replace(/\biodine distribution\b/gi, "mining chemical distribution")
      .replace(/\biodine\b/gi, "mining chemicals")
      .replace(/\bprivate capital\b/gi, "capital markets");

  return {
    ...parsed.data,
    press: {
      ...parsed.data.press,
      bio: parsed.data.press.bio.map(currentTerms),
      facts: parsed.data.press.facts.map((fact) => ({
        k: /^private capital$/i.test(fact.k) ? "Capital market" : currentTerms(fact.k),
        v: currentTerms(fact.v),
      })),
    },
  };
}

/** What the public pages render. Cached; refreshed the moment the admin saves, and otherwise within a minute. */
export const getContent = unstable_cache(
  async (): Promise<Content> => {
    try {
      const latest = await readLatest();
      return latest ? parse(latest.data) : DEFAULT_CONTENT;
    } catch (error) {
      console.error("[cms] could not read content; showing the defaults", error);
      return DEFAULT_CONTENT;
    }
  },
  ["cms-content", "terminology-v2", "photos-2026-10-02b"],
  { tags: [TAG], revalidate: 60 },
);

/** The latest saved content, uncached, for the admin. */
export async function getContentForEditing(): Promise<Content> {
  const latest = await readLatest();
  return latest ? parse(latest.data) : DEFAULT_CONTENT;
}

export class ContentError extends Error {}

/**
 * Applies one section's change to the latest content and saves it as a new version. If someone else
 * saved in the moment between reading and writing, the change is applied again on top of their
 * version, so neither edit is lost.
 */
export async function updateContent(change: (current: Content) => Content): Promise<void> {
  if (!configured()) throw new ContentError("The content store isn't connected on this server.");
  let base = await readLatest();
  for (let attempt = 0; attempt < 3; attempt++) {
    const next = ContentSchema.safeParse({ ...change(base ? parse(base.data) : DEFAULT_CONTENT), savedAt: new Date().toISOString() });
    if (!next.success) throw new ContentError(next.error.issues[0]?.message ?? "Some fields need attention.");
    const name = `${DIR}${String(Date.now()).padStart(15, "0")}-${randomUUID().slice(0, 8)}.json`;
    await put(name, JSON.stringify(next.data), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      cacheControlMaxAge: 31536000,
    });
    const all = await versions();
    const mine = all.findIndex((v) => v.pathname === name);
    const between = all.slice(0, mine).filter((v) => !base || v.pathname > base.pathname);
    if (between.length === 0) {
      const old = all.slice(0, Math.max(0, all.length - KEEP));
      if (old.length) await del(old.map((v) => v.url)).catch((error) => console.error("[cms] pruning old versions failed", error));
      revalidateTag(TAG, { expire: 0 });
      revalidatePath("/", "layout");
      return;
    }
    base = await read(between.at(-1)!);
  }
  throw new ContentError("Someone else is saving at the same moment. Try again.");
}

export const published = (ideas: Idea[]) => ideas.filter((i) => i.date);
