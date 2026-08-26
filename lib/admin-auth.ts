import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "pt_admin";

function secret(): string {
  return process.env.ADMIN_PASSWORD || "troisvallees";
}

export function adminToken(): string {
  return createHmac("sha256", secret()).update("admin-session").digest("hex");
}

export function isValidPassword(password: string): boolean {
  const expected = secret();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = Buffer.from(adminToken());
  const received = Buffer.from(token);
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

export function isAdminRequest(): boolean {
  return isValidToken(cookies().get(COOKIE)?.value);
}

export { COOKIE as ADMIN_COOKIE };
