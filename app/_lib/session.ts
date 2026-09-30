import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_HOURS, signToken, verifyToken } from "./token";

// One shared password for the team (brief §8: a light CMS the team can edit). A signed cookie, scoped to
// /admin, keeps them signed in for 12 hours.

export function passwordMatches(attempt: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const digest = (v: string) => createHash("sha256").update(v).digest();
  return timingSafeEqual(digest(attempt), digest(expected));
}

export async function startSession() {
  const token = await signToken();
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/admin" });
}

export async function isAdmin(): Promise<boolean> {
  return verifyToken((await cookies()).get(SESSION_COOKIE)?.value);
}

/** For admin pages: send anyone not signed in to the login screen. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
