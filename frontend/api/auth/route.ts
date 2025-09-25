import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  if (username === "teacher" && password === "pass123") {
    return NextResponse.json({
      message: "Login successful",
      token: "dummy-jwt-token-12345",
    });
  }
  return NextResponse.json({ detail: "Invalid credentials" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (token === "dummy-jwt-token-12345") {
    return NextResponse.json({ valid: true });
  }
  return NextResponse.json({ detail: "Invalid token" }, { status: 401 });
}
