"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import {
  AwardSchema,
  ContentError,
  IdeaSchema,
  PodcastSchema,
  PressSchema,
  updateContent,
  youtubeId,
  type Award,
  type Idea,
  type Podcast,
  type Press,
} from "../_lib/content";
import { THEMES } from "../_components/data";
import { endSession, isAdmin, passwordMatches, startSession } from "../_lib/session";

export type Result = { ok: boolean; message: string } | null;

class SignedOut extends Error {}

// Every action checks the session itself; the proxy in front of /admin is only a convenience.
async function guard() {
  if (!(await isAdmin())) throw new SignedOut();
}

// Names the row a problem is in ("Episode 3: …"), so the team can find it in a long list
type Where = (path: PropertyKey[]) => string;
const nth = (noun: string) => (path: PropertyKey[]) => (typeof path[0] === "number" ? `${noun} ${path[0] + 1}: ` : "");
const inPress: Where = ([part, at]) =>
  typeof at === "number" ? `${{ bio: "Paragraph", facts: "Fact", kit: "Media-kit file" }[String(part)] ?? "Row"} ${at + 1}: ` : "";

function failure(error: unknown, where?: Where): Result {
  if (error instanceof SignedOut) return { ok: false, message: "Your session has ended. Sign in again in another tab, then save here." };
  if (error instanceof ContentError) return { ok: false, message: error.message };
  if (error instanceof z.ZodError) {
    const issue = error.issues[0];
    return { ok: false, message: issue ? `${where?.(issue.path) ?? ""}${issue.message}` : "Some fields need attention." };
  }
  console.error("[admin] save failed", error);
  return { ok: false, message: "That didn't save. Try again in a moment." };
}

export async function login(_: Result, form: FormData): Promise<Result> {
  if (!process.env.ADMIN_PASSWORD) return { ok: false, message: "The admin password isn't set on the server yet." };
  if (!passwordMatches(String(form.get("password") ?? ""))) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // slows guessing
    return { ok: false, message: "That password isn't right." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

// On success the editor goes back to the list itself (a redirect here would surface in its error handling)
export async function saveIdea(originalSlug: string | null, idea: Idea): Promise<Result> {
  try {
    await guard();
    const clean = IdeaSchema.parse(idea);
    await updateContent((content) => {
      const ideas = [...content.ideas];
      const at = originalSlug ? ideas.findIndex((i) => i.slug === originalSlug) : -1;
      if (ideas.some((i, n) => i.slug === clean.slug && n !== at)) throw new ContentError("Another idea already uses that web address.");
      if (originalSlug && at < 0) throw new ContentError("This idea was deleted while you were editing it. Copy your text, then add it as a new idea.");
      if (at >= 0) ideas[at] = clean;
      else ideas.unshift(clean);
      return { ...content, ideas };
    });
    return { ok: true, message: "Saved." };
  } catch (error) {
    return failure(error);
  }
}

export async function deleteIdea(slug: string): Promise<Result> {
  try {
    await guard();
    await updateContent((content) => ({ ...content, ideas: content.ideas.filter((i) => i.slug !== slug) }));
    return { ok: true, message: "Deleted." };
  } catch (error) {
    return failure(error);
  }
}

export async function moveIdea(slug: string, by: -1 | 1): Promise<Result> {
  try {
    await guard();
    await updateContent((content) => {
      const ideas = [...content.ideas];
      const from = ideas.findIndex((i) => i.slug === slug);
      const to = from + by;
      if (from < 0 || to < 0 || to >= ideas.length) return content;
      [ideas[from], ideas[to]] = [ideas[to], ideas[from]];
      return { ...content, ideas };
    });
    return { ok: true, message: "Order saved." };
  } catch (error) {
    return failure(error);
  }
}

export async function savePress(press: Press): Promise<Result> {
  try {
    await guard();
    const clean = PressSchema.parse(press);
    await updateContent((content) => ({ ...content, press: clean }));
    return { ok: true, message: "Saved. The press page is updated." };
  } catch (error) {
    return failure(error, inPress);
  }
}

export async function saveAwards(awards: Award[]): Promise<Result> {
  try {
    await guard();
    const clean = z.array(AwardSchema).max(60, "The press page holds up to 60 awards").parse(awards);
    if (clean.filter((a) => a.home).length > 3) throw new ContentError("Only three awards fit on the home page. Untick one.");
    await updateContent((content) => ({ ...content, awards: clean }));
    return { ok: true, message: "Saved. The press page and the home page are updated." };
  } catch (error) {
    return failure(error, nth("Award"));
  }
}

export async function savePodcasts(podcasts: Podcast[]): Promise<Result> {
  try {
    await guard();
    const parsed = z.array(PodcastSchema).max(100, "The podcasts page holds up to 100 episodes").parse(podcasts);
    const seen = new Map<string, number>();
    parsed.forEach((p, i) => {
      const id = youtubeId(p.url)!;
      if (seen.has(id)) throw new ContentError(`Episode ${i + 1} is the same video as episode ${seen.get(id)! + 1}. Delete one of them.`);
      seen.set(id, i);
    });
    // One spelling per theme, so "markets & investing" joins "Markets & Investing" rather than starting a group
    const spelling = new Map<string, string>();
    const key = (t: string) => t.toLowerCase().replace(/\s+/g, " ");
    for (const t of [...THEMES, ...parsed.map((p) => p.theme ?? "")]) if (t && !spelling.has(key(t))) spelling.set(key(t), t.replace(/\s+/g, " "));
    const clean = parsed.map((p) => ({ ...p, theme: p.theme && spelling.get(key(p.theme)) }));
    await updateContent((content) => ({ ...content, podcasts: clean }));
    return { ok: true, message: "Saved. The podcasts page and the home page are updated." };
  } catch (error) {
    return failure(error, nth("Episode"));
  }
}
