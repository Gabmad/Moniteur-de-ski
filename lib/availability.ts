export type SlotKey = "morning" | "afternoon";

export type DayAvailability = {
  morning: boolean;
  afternoon: boolean;
};

export type AvailabilityMap = Record<string, DayAvailability>;

export type AvailabilityFile = {
  days: AvailabilityMap;
};

export const ALL_CLOSED: DayAvailability = {
  morning: false,
  afternoon: false,
};

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isFullDayOffer(offerId: string): boolean {
  return offerId.endsWith("-full");
}

export function getDayAvailability(
  days: AvailabilityMap,
  date: Date
): DayAvailability {
  return days[toDateKey(date)] ?? ALL_CLOSED;
}

export function isSlotOpen(
  days: AvailabilityMap,
  date: Date,
  slot: SlotKey | "fullday"
): boolean {
  const day = getDayAvailability(days, date);
  if (slot === "fullday") {
    return day.morning && day.afternoon;
  }
  return day[slot];
}

export function isDateOpenForOffer(
  days: AvailabilityMap,
  date: Date,
  offerId: string
): boolean {
  const day = getDayAvailability(days, date);
  if (isFullDayOffer(offerId)) {
    return day.morning && day.afternoon;
  }
  return day.morning || day.afternoon;
}

export function dateStatus(
  days: AvailabilityMap,
  date: Date
): "open" | "partial" | "closed" {
  const day = getDayAvailability(days, date);
  if (day.morning && day.afternoon) return "open";
  if (!day.morning && !day.afternoon) return "closed";
  return "partial";
}

export function normalizeDays(days: AvailabilityMap): AvailabilityMap {
  const next: AvailabilityMap = {};
  for (const [key, value] of Object.entries(days)) {
    const morning = value?.morning === true;
    const afternoon = value?.afternoon === true;
    if (!morning && !afternoon) continue;
    next[key] = { morning, afternoon };
  }
  return next;
}
