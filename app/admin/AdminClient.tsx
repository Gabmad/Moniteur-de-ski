"use client";

import { useEffect, useMemo, useState } from "react";
import {
  dateStatus,
  normalizeDays,
  toDateKey,
  type AvailabilityMap,
  type DayAvailability,
} from "@/lib/availability";

const weekdayIndexes = [1, 2, 3, 4, 5, 6, 0];

export default function AdminClient() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [days, setDays] = useState<AvailabilityMap>({});
  const [selected, setSelected] = useState<Date | null>(null);
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/login")
      .then((res) => res.json())
      .then((data: { ok?: boolean }) => setLoggedIn(Boolean(data.ok)))
      .catch(() => setLoggedIn(false));
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data: { days?: AvailabilityMap }) => setDays(data.days ?? {}));
  }, [loggedIn]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(
        cursor
      ),
    [cursor]
  );

  const weekdays = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("fr-FR", { weekday: "short" });
    return weekdayIndexes.map((day) => {
      const date = new Date(2024, 0, day === 0 ? 7 : day);
      return formatter.format(date).replace(".", "");
    });
  }, []);

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

  const selectedDay: DayAvailability | null = selected
    ? days[toDateKey(selected)] ?? { morning: false, afternoon: false }
    : null;

  async function login(event: React.FormEvent) {
    event.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setLoggedIn(true);
      setPassword("");
      setStatus("");
    } else {
      setStatus("Mot de passe incorrect.");
    }
  }

  function updateSelected(next: DayAvailability) {
    if (!selected) return;
    const key = toDateKey(selected);
    setDays((current) => {
      const copy = { ...current };
      if (next.morning || next.afternoon) {
        copy[key] = next;
      } else {
        delete copy[key];
      }
      return copy;
    });
  }

  async function save() {
    setSaving(true);
    setStatus("");
    const res = await fetch("/api/availability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days: normalizeDays(days) }),
    });
    setSaving(false);
    if (res.ok) {
      const data = (await res.json()) as { days: AvailabilityMap };
      setDays(data.days);
      setStatus("Calendrier enregistré.");
    } else {
      const data = (await res.json()) as { error?: string };
      setStatus(data.error || "Enregistrement impossible.");
    }
  }

  if (loggedIn === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm font-light text-ink-faint">…</p>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6">
        <form onSubmit={login} className="w-full max-w-sm">
          <p className="eyebrow">Private Teaching</p>
          <h1 className="mt-4 font-serif text-4xl text-ink">Calendrier</h1>
          <p className="mt-4 text-sm font-light text-ink-muted">
            Espace pour ouvrir tes créneaux, un par un.
          </p>
          <label className="label-luxury mt-8" htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-luxury"
            autoComplete="current-password"
          />
          <button type="submit" className="btn-primary mt-6">
            Entrer
          </button>
          {status && <p className="mt-4 text-sm text-ink">{status}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Espace moniteur</p>
            <h1 className="mt-3 font-serif text-4xl text-ink">Créneaux</h1>
            <p className="mt-3 max-w-xl text-sm font-light text-ink-muted">
              Clique un jour, puis ouvre le matin, l’après-midi, ou les deux.
              Par défaut, tout est fermé.
            </p>
          </div>
          <button type="button" onClick={save} className="btn-primary" disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-white p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
                }
                className="px-2 text-ink-faint hover:text-ink"
              >
                ←
              </button>
              <p className="font-serif text-xl capitalize text-ink">{monthLabel}</p>
              <button
                type="button"
                onClick={() =>
                  setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
                }
                className="px-2 text-ink-faint hover:text-ink"
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
                if (!date) return <span key={`e-${index}`} />;
                const key = toDateKey(date);
                const statusType = dateStatus(days, date);
                const active = selected && toDateKey(selected) === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelected(date)}
                    className={`relative mx-auto flex h-10 w-10 items-center justify-center text-sm transition ${
                      active
                        ? "bg-gold text-ink"
                        : statusType === "closed"
                          ? "text-ink/25 line-through"
                          : "text-ink hover:bg-gold/20"
                    }`}
                  >
                    {date.getDate()}
                    {statusType === "partial" && !active && (
                      <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-[10px] font-medium uppercase tracking-luxury text-ink-faint">
              <span>Disponible</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Partiel
              </span>
              <span className="line-through">Indisponible</span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8">
            {!selected || !selectedDay ? (
              <p className="font-serif text-2xl text-ink-faint">
                Choisis un jour
              </p>
            ) : (
              <>
                <p className="text-[10px] font-medium uppercase tracking-luxury text-gold">
                  {toDateKey(selected)}
                </p>
                <h2 className="mt-2 font-serif text-3xl capitalize text-ink">
                  {selected.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </h2>

                <div className="mt-8 space-y-3">
                  <ToggleRow
                    label="Matin"
                    hint="9h – 13h"
                    value={selectedDay.morning}
                    onChange={(morning) =>
                      updateSelected({ ...selectedDay, morning })
                    }
                  />
                  <ToggleRow
                    label="Après-midi"
                    hint="13h – 17h"
                    value={selectedDay.afternoon}
                    onChange={(afternoon) =>
                      updateSelected({ ...selectedDay, afternoon })
                    }
                  />
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      updateSelected({ morning: true, afternoon: true })
                    }
                    className="btn-ghost"
                  >
                    Ouvrir la journée
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateSelected({ morning: false, afternoon: false })
                    }
                    className="btn-ghost"
                  >
                    Bloquer la journée
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {status && <p className="mt-8 text-sm font-light text-ink">{status}</p>}
      </div>
    </main>
  );
}

function ToggleRow({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex w-full items-center justify-between border px-5 py-4 text-left transition ${
        value ? "border-gold bg-gold/10" : "border-ink/15"
      }`}
    >
      <span>
        <span className="block font-serif text-xl text-ink">{label}</span>
        <span className="mt-1 block text-[11px] uppercase tracking-luxury text-ink-faint">
          {hint}
        </span>
      </span>
      <span className="text-[11px] font-medium uppercase tracking-luxury text-ink">
        {value ? "Disponible" : "Indisponible"}
      </span>
    </button>
  );
}
