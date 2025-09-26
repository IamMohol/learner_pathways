import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";
  const { pathname } = request.nextUrl;

  console.log(
    `Middleware: isLoggedIn=${isLoggedIn}, pathname=${pathname}, cookies=${JSON.stringify(request.cookies.getAll())}`
  );

  if (pathname === "/" || isLoggedIn) {
    return NextResponse.next();
  }

  console.log("Middleware: Redirecting to /");
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/hub/:path*", "/reports/:path*"],
};
