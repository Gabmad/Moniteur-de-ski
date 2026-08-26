import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, isValidPassword, isAdminRequest } from "@/lib/admin-auth";

export async function GET() {
  return NextResponse.json({ ok: isAdminRequest() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if (!isValidPassword(body.password ?? "")) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
