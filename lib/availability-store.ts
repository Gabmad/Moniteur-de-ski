import { promises as fs } from "fs";
import path from "path";
import { head, put } from "@vercel/blob";
import type { AvailabilityFile, AvailabilityMap } from "./availability";
import { normalizeDays } from "./availability";

const filePath = path.join(process.cwd(), "data", "availability.json");
const blobPathname = "availability.json";

/** Vercel Blob via OIDC (BLOB_STORE_ID) or legacy static token. */
function hasBlobConfig(): boolean {
  return Boolean(
    process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN
  );
}

async function readFromFile(): Promise<AvailabilityMap> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as AvailabilityFile;
    return parsed.days ?? {};
  } catch {
    return {};
  }
}

async function writeToFile(days: AvailabilityMap): Promise<void> {
  const payload: AvailabilityFile = { days: normalizeDays(days) };
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

async function readFromBlob(): Promise<AvailabilityMap> {
  try {
    const meta = await head(blobPathname);
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return {};
    const parsed = (await res.json()) as AvailabilityFile;
    return parsed.days ?? {};
  } catch {
    return {};
  }
}

async function writeToBlob(days: AvailabilityMap): Promise<void> {
  const payload: AvailabilityFile = { days: normalizeDays(days) };
  // Let the SDK pick OIDC (BLOB_STORE_ID + VERCEL_OIDC_TOKEN) or BLOB_READ_WRITE_TOKEN.
  await put(blobPathname, JSON.stringify(payload, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function readAvailability(): Promise<AvailabilityMap> {
  if (hasBlobConfig()) {
    return readFromBlob();
  }
  return readFromFile();
}

export async function writeAvailability(days: AvailabilityMap): Promise<void> {
  if (hasBlobConfig()) {
    await writeToBlob(days);
    return;
  }

  try {
    await writeToFile(days);
  } catch (error) {
    const err = new Error(
      "Impossible d'enregistrer sur l'hébergement actuel. Dans Vercel → Storage, crée un Blob et lie-le au projet (BLOB_STORE_ID), puis redéploie."
    );
    (err as Error & { cause?: unknown }).cause = error;
    throw err;
  }
}
