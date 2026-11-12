
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isPrivateRoute =
    request.nextUrl.pathname.startsWith("/my-bookings") ||
    request.nextUrl.pathname.startsWith("/my-listings") ||
    request.nextUrl.pathname.startsWith("/upstudio") ||
    request.nextUrl.pathname.startsWith("/add-studio") ||
    request.nextUrl.pathname.startsWith("/studios") ||
    request.nextUrl.pathname.startsWith("/book-studio");

  if (isPrivateRoute && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackURL",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-bookings/:path*",
    "/my-listings/:path*",
    "/upstudio/:path*",
    "/add-studio/:path*",
    "/book-studio/:path*",
    "/studios/:path*",
  ],
};
