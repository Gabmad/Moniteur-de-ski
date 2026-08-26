import { promises as fs } from "fs";
import path from "path";
import type { AvailabilityFile, AvailabilityMap } from "./availability";
import { normalizeDays } from "./availability";

const filePath = path.join(process.cwd(), "data", "availability.json");

export async function readAvailability(): Promise<AvailabilityMap> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as AvailabilityFile;
    return parsed.days ?? {};
  } catch {
    return {};
  }
}

export async function writeAvailability(days: AvailabilityMap): Promise<void> {
  const payload: AvailabilityFile = { days: normalizeDays(days) };
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}
