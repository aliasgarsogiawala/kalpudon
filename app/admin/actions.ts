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
  type Award,
  type Idea,
  type Podcast,
  type Press,
} from "../_lib/content";
import { endSession, isAdmin, passwordMatches, startSession } from "../_lib/session";

export type Result = { ok: boolean; message: string } | null;

class SignedOut extends Error {}

// Every action checks the session itself; the proxy in front of /admin is only a convenience.
async function guard() {
  if (!(await isAdmin())) throw new SignedOut();
}

function failure(error: unknown): Result {
  if (error instanceof SignedOut) return { ok: false, message: "Your session has ended. Sign in again to save." };
  if (error instanceof ContentError) return { ok: false, message: error.message };
  if (error instanceof z.ZodError) {
    const issue = error.issues[0];
    return { ok: false, message: issue ? issue.message : "Some fields need attention." };
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

export async function saveIdea(originalSlug: string | null, idea: Idea): Promise<Result> {
  try {
    await guard();
    const clean = IdeaSchema.parse(idea);
    await updateContent((content) => {
      const ideas = [...content.ideas];
      const at = originalSlug ? ideas.findIndex((i) => i.slug === originalSlug) : -1;
      if (ideas.some((i, n) => i.slug === clean.slug && n !== at)) throw new ContentError("Another idea already uses that web address.");
      if (at >= 0) ideas[at] = clean;
      else ideas.unshift(clean);
      return { ...content, ideas };
    });
  } catch (error) {
    return failure(error);
  }
  redirect("/admin/ideas?saved=1");
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
    return failure(error);
  }
}

export async function saveAwards(awards: Award[]): Promise<Result> {
  try {
    await guard();
    const clean = z.array(AwardSchema).max(60).parse(awards);
    await updateContent((content) => ({ ...content, awards: clean }));
    return { ok: true, message: "Saved. The press page and the home page are updated." };
  } catch (error) {
    return failure(error);
  }
}

export async function savePodcasts(podcasts: Podcast[]): Promise<Result> {
  try {
    await guard();
    const clean = z.array(PodcastSchema).max(100).parse(podcasts);
    await updateContent((content) => ({ ...content, podcasts: clean }));
    return { ok: true, message: "Saved. The podcasts page and the home page are updated." };
  } catch (error) {
    return failure(error);
  }
}
