"use client";

import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { WhatsAppTrigger } from "@/components/whatsapp/WhatsAppProvider";

export default function ContactForm() {
  const t = useTranslations("pages.contact");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(name)}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-12 max-w-lg space-y-5">
      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-mist">
          {t("name")}
        </span>
        <input
          name="name"
          required
          className="w-full border border-ink/15 px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-mist">
          {t("email")}
        </span>
        <input
          name="email"
          type="email"
          required
          className="w-full border border-ink/15 px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-mist">
          {t("message")}
        </span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full resize-none border border-ink/15 px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-pill">
          {t("submit")}
        </button>
        <span className="text-sm text-mist">{t("or")}</span>
        <WhatsAppTrigger label={t("whatsapp")} className="text-sm underline" />
      </div>
    </form>
  );
}
