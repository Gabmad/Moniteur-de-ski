import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { readAvailability, writeAvailability } from "@/lib/availability-store";
import { normalizeDays, type AvailabilityMap } from "@/lib/availability";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStore = {
  "Cache-Control": "no-store, max-age=0",
};

export async function GET() {
  const days = await readAvailability();
  return NextResponse.json({ days }, { headers: noStore });
}

export async function PUT(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: noStore }
    );
  }

  const body = (await request.json()) as { days?: AvailabilityMap };
  const days = normalizeDays(body.days ?? {});

  try {
    await writeAvailability(days);
    return NextResponse.json({ days }, { headers: noStore });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Enregistrement impossible.";
    return NextResponse.json({ error: message }, { status: 500, headers: noStore });
  }
}
