import { SignJWT, jwtVerify } from "jose";

// Signing and checking the admin session token. Kept free of request APIs so the proxy can use it too.

export const SESSION_COOKIE = "kk_admin";
export const SESSION_HOURS = 12;

function key() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set (32+ characters).");
  return new TextEncoder().encode(secret);
}

export function signToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(key());
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, key(), { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}
