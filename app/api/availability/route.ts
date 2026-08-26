import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { readAvailability, writeAvailability } from "@/lib/availability-store";
import { normalizeDays, type AvailabilityMap } from "@/lib/availability";

export async function GET() {
  const days = await readAvailability();
  return NextResponse.json({ days });
}

export async function PUT(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { days?: AvailabilityMap };
  const days = normalizeDays(body.days ?? {});

  try {
    await writeAvailability(days);
    return NextResponse.json({ days });
  } catch {
    return NextResponse.json(
      {
        error:
          "Impossible d'enregistrer ici. En local, le calendrier se sauvegarde dans data/availability.json.",
      },
      { status: 500 }
    );
  }
}
