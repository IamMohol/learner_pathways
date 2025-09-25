import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("auth_token")?.value; // Replace with your auth token check
  const { pathname } = request.nextUrl;

  if (pathname === "/" || isLoggedIn) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/hub/:path*", "/reports/:path*"],
};
