import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "./app/_lib/token";

// First line of defence for the admin: anyone without a valid session goes to the login screen.
// Every admin page, save and upload checks the session again on the server.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();
  // A save whose session ran out mid-edit gets its own "sign in again" message from the action; a
  // redirect here would break the save's response instead
  if (request.method === "POST" && request.headers.has("next-action")) return NextResponse.next();
  if (await verifyToken(request.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
