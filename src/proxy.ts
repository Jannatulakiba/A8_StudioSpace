import { NextResponse, type NextRequest } from "next/server";

/**
 * Server-side guard for private routes (Next 16 proxy — middleware.ts এখন deprecated).
 * শুধু BetterAuth session cookie-র presence দেখে; ভারী verification করে না
 * (proxy-তে DB ছোঁয়া নিষেধ) — আসল verification API-র JWT middleware-এ হয়।
 * Logged-in user reload করলে cookie থাকে বলে redirect হয় না; খালি visit করলে
 * render-এর আগেই login-এ পাঠায়।
 */
export function proxy(request: NextRequest) {
  const hasSession =
    request.cookies.has("better-auth.session_token") ||
    request.cookies.has("__Secure-better-auth.session_token");

  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-studio/:path*",
    "/my-listings/:path*",
    "/my-bookings/:path*",
    "/dashboard/:path*",
    "/saved-studios/:path*",
    "/studios/edit/:path*",
  ],
};
