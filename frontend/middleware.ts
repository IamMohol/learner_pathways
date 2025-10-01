import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await request.cookies;
  const isLoggedIn = cookieStore.get("isLoggedIn")?.value === "true";
  console.log(
    `Middleware: isLoggedIn=${isLoggedIn}, pathname=${request.nextUrl.pathname}, cookies=${JSON.stringify(
      cookieStore.getAll()
    )}`
  );
  if (!isLoggedIn && ["/hub", "/reports"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/hub", "/reports"],
};
