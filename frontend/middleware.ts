import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Allow public access to landing page
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Redirect authenticated users from login attempts to dashboard
  if (pathname === "/login" && token) {
    try {
      const res = await fetch("http://localhost:3000/api/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      // Proceed if token invalid
    }
  }

  // Protect dashboard and learner routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/learners")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    try {
      const res = await fetch("http://localhost:3000/api/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/learners/:path*", "/login"],
};
