"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { dateStatus, type AvailabilityMap } from "@/lib/availability";

interface CalendarProps {
  locale: Locale;
  selected: Date | null;
  onSelect: (date: Date) => void;
  days?: AvailabilityMap;
  offerId?: string;
}

const weekdayIndexes = [1, 2, 3, 4, 5, 6, 0];

export default function Calendar({
  locale,
  selected,
  onSelect,
  days = {},
  offerId = "ski-half",
}: CalendarProps) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const intlLocale =
    locale === "en" ? "en-GB" : locale === "pt" ? "pt-PT" : "fr-FR";

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(intlLocale, {
        month: "long",
        year: "numeric",
      }).format(cursor),
    [cursor, intlLocale]
  );

  const weekdays = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(intlLocale, { weekday: "short" });
    return weekdayIndexes.map((day) => {
      const date = new Date(2024, 0, day === 0 ? 7 : day);
      return formatter.format(date).replace(".", "");
    });
  }, [intlLocale]);

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const list: (Date | null)[] = [];

    for (let i = 0; i < startOffset; i += 1) list.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) {
      list.push(new Date(year, month, d));
    }
    return list;
  }, [cursor]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isSameDay(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
          }
          className="px-2 text-sm text-ink-faint transition hover:text-ink"
          aria-label="Previous month"
        >
          ←
        </button>
        <p className="font-serif text-xl capitalize text-ink">{monthLabel}</p>
        <button
          type="button"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
          }
          className="px-2 text-sm text-ink-faint transition hover:text-ink"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {weekdays.map((day) => (
          <span
            key={day}
            className="text-[10px] font-medium uppercase tracking-luxury text-ink-faint"
          >
            {day}
          </span>
        ))}
        {cells.map((date, index) => {
          if (!date) {
            return <span key={`empty-${index}`} />;
          }
          const past = date < today;
          const status = dateStatus(days, date);
          const fullDayBlocked =
            offerId.endsWith("-full") && status !== "open";
          const disabled = past || status === "closed" || fullDayBlocked;
          const active = selected ? isSameDay(date, selected) : false;
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`relative mx-auto flex h-9 w-9 items-center justify-center text-sm transition ${
                disabled
                  ? "cursor-not-allowed text-ink/20 line-through"
                  : active
                    ? "bg-gold text-ink"
                    : "text-ink hover:bg-gold/20"
              }`}
            >
              {date.getDate()}
              {!disabled && status === "partial" && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
