import { NextResponse } from "next/server";

const SESSION_COOKIE = "selveo_admin_session";

async function makeSessionToken() {
  const secret = process.env.SESSION_SECRET || "selveo-fallback-secret";
  const password = process.env.ADMIN_PASSWORD || "selveo2026";
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(password));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/panel-selveo/login";
  const isLoginApi = pathname === "/api/admin/login";
  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  const expected = await makeSessionToken();

  if (cookie && cookie === expected) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const loginUrl = new URL("/panel-selveo/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/panel-selveo/:path*", "/api/admin/:path*"],
};
