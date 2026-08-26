"use client";

import { useEffect, useMemo, useState } from "react";
import Calendar from "./Calendar";
import {
  bookingOffers,
  buildWhatsAppUrl,
  type OfferCategory,
} from "@/lib/booking";
import {
  getDayAvailability,
  isDateOpenForOffer,
  isFullDayOffer,
  isSlotOpen,
  type AvailabilityMap,
  type SlotKey,
} from "@/lib/availability";
import { type Locale, localeNames } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface BookingWidgetProps {
  locale: Locale;
  dict: Dictionary;
  categories?: OfferCategory[];
  defaultOfferId?: string;
}

export default function BookingWidget({
  locale,
  dict,
  categories = ["ski", "photo", "video"],
  defaultOfferId,
}: BookingWidgetProps) {
  const offers = useMemo(
    () => bookingOffers.filter((offer) => categories.includes(offer.category)),
    [categories]
  );

  const [availability, setAvailability] = useState<AvailabilityMap>({});
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<SlotKey | "fullday" | "">("");
  const [offerId, setOfferId] = useState(defaultOfferId ?? offers[0]?.id ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState("2");
  const [language, setLanguage] = useState<Locale>(locale);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const intlLocale =
    locale === "en" ? "en-GB" : locale === "pt" ? "pt-PT" : "fr-FR";

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data: { days?: AvailabilityMap }) => setAvailability(data.days ?? {}))
      .catch(() => setAvailability({}));
  }, []);

  const fullDay = isFullDayOffer(offerId);
  const openSlots = useMemo(() => {
    if (!date) return { morning: false, afternoon: false };
    return getDayAvailability(availability, date);
  }, [availability, date]);

  function handleOfferChange(nextId: string) {
    setOfferId(nextId);
    setSlot("");
    if (date && !isDateOpenForOffer(availability, date, nextId)) {
      setDate(null);
    }
  }

  function handleDateSelect(next: Date) {
    setDate(next);
    setSlot("");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!date || !name.trim() || !email.trim() || !phone.trim() || !slot) {
      setError(dict.booking.required);
      return;
    }
    if (!isSlotOpen(availability, date, slot)) {
      setError(dict.booking.slotUnavailable);
      return;
    }
    setError("");

    const offerLabel =
      dict.booking.offers[offerId as keyof typeof dict.booking.offers] ?? offerId;
    const dateLabel = new Intl.DateTimeFormat(intlLocale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
    const slotLabel =
      slot === "fullday"
        ? dict.booking.fullday
        : slot === "morning"
          ? dict.booking.morning
          : dict.booking.afternoon;

    const text = dict.booking.waMessage
      .replace("{offer}", offerLabel)
      .replace("{date}", dateLabel)
      .replace("{slot}", slotLabel)
      .replace("{name}", name.trim())
      .replace("{email}", email.trim())
      .replace("{phone}", phone.trim())
      .replace("{people}", people)
      .replace("{language}", localeNames[language])
      .replace("{message}", message.trim());

    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="reserver" className="scroll-mt-28 bg-cream-dark py-24 md:py-32">
      <div className="container-narrow">
        <div className="text-center">
          <p className="eyebrow">{dict.booking.eyebrow}</p>
          <h2 className="section-title mt-4">{dict.booking.title}</h2>
          <div className="gold-rule mt-8" />
          <p className="section-subtitle mx-auto">{dict.booking.subtitle}</p>
          <p className="mx-auto mt-5 max-w-2xl text-[14px] font-light leading-relaxed text-ink-muted">
            {dict.booking.flexibility}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="bg-cream p-6 sm:p-8">
            <p className="label-luxury">{dict.booking.selectDate}</p>
            <Calendar
              locale={locale}
              selected={date}
              onSelect={handleDateSelect}
              days={availability}
              offerId={offerId}
            />
            <div className="mt-6 flex flex-wrap gap-4 text-[10px] font-medium uppercase tracking-luxury text-ink-faint">
              <span>{dict.booking.legendAvailable}</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {dict.booking.legendPartial}
              </span>
              <span className="line-through">{dict.booking.legendUnavailable}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="label-luxury" htmlFor="service">
                {dict.booking.service}
              </label>
              <select
                id="service"
                value={offerId}
                onChange={(e) => handleOfferChange(e.target.value)}
                className="input-luxury"
              >
                {offers.map((offer) => (
                  <option key={offer.id} value={offer.id}>
                    {
                      dict.booking.offers[
                        offer.id as keyof typeof dict.booking.offers
                      ]
                    }
                  </option>
                ))}
              </select>
            </div>

            {date && (
              <div>
                <p className="label-luxury">{dict.booking.selectSlot}</p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {fullDay ? (
                    <button
                      type="button"
                      disabled={!openSlots.morning || !openSlots.afternoon}
                      onClick={() => setSlot("fullday")}
                      className={`flex-1 border px-4 py-3 text-left text-sm transition ${
                        slot === "fullday"
                          ? "border-gold bg-gold/10 text-ink"
                          : "border-ink/15 text-ink hover:border-gold"
                      } disabled:cursor-not-allowed disabled:opacity-30`}
                    >
                      <span className="block font-medium">{dict.booking.fullday}</span>
                      <span className="mt-1 block text-[11px] text-ink-faint">
                        {dict.booking.fulldayHours}
                      </span>
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={!openSlots.morning}
                        onClick={() => setSlot("morning")}
                        className={`flex-1 border px-4 py-3 text-left text-sm transition ${
                          slot === "morning"
                            ? "border-gold bg-gold/10 text-ink"
                            : "border-ink/15 text-ink hover:border-gold"
                        } disabled:cursor-not-allowed disabled:opacity-30`}
                      >
                        <span className="block font-medium">
                          {dict.booking.morning}
                        </span>
                        <span className="mt-1 block text-[11px] text-ink-faint">
                          {dict.booking.morningHours}
                        </span>
                      </button>
                      <button
                        type="button"
                        disabled={!openSlots.afternoon}
                        onClick={() => setSlot("afternoon")}
                        className={`flex-1 border px-4 py-3 text-left text-sm transition ${
                          slot === "afternoon"
                            ? "border-gold bg-gold/10 text-ink"
                            : "border-ink/15 text-ink hover:border-gold"
                        } disabled:cursor-not-allowed disabled:opacity-30`}
                      >
                        <span className="block font-medium">
                          {dict.booking.afternoon}
                        </span>
                        <span className="mt-1 block text-[11px] text-ink-faint">
                          {dict.booking.afternoonHours}
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-luxury" htmlFor="name">
                  {dict.booking.name}
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-luxury"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label className="label-luxury" htmlFor="phone">
                  {dict.booking.phone}
                </label>
                <input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-luxury"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label-luxury" htmlFor="email">
                {dict.booking.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-luxury"
                autoComplete="email"
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-luxury" htmlFor="people">
                  {dict.booking.people}
                </label>
                <select
                  id="people"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="input-luxury"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-luxury" htmlFor="language">
                  {dict.booking.language}
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Locale)}
                  className="input-luxury"
                >
                  <option value="fr">{localeNames.fr}</option>
                  <option value="en">{localeNames.en}</option>
                  <option value="pt">{localeNames.pt}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-luxury" htmlFor="message">
                {dict.booking.message}
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="input-luxury resize-none"
              />
            </div>

            {error && <p className="text-sm font-light text-ink">{error}</p>}

            <button type="submit" className="btn-primary mt-2 self-start">
              {dict.booking.submit}
            </button>
            <p className="text-[13px] font-light leading-relaxed text-ink-faint">
              {dict.booking.note}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
