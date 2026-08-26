"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { buildWhatsAppUrl } from "@/lib/site";

type WhatsAppContextValue = {
  open: (prefill?: string) => void;
  close: () => void;
};

const WhatsAppContext = createContext<WhatsAppContextValue | null>(null);

export function useWhatsApp() {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) {
    throw new Error("useWhatsApp must be used within WhatsAppProvider");
  }
  return ctx;
}

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const t = useTranslations("whatsapp");
  const [openState, setOpenState] = useState(false);
  const [text, setText] = useState("");

  const open = useCallback(
    (prefill?: string) => {
      setText(prefill ?? t("prefill"));
      setOpenState(true);
    },
    [t]
  );

  const close = useCallback(() => setOpenState(false), []);

  function send() {
    window.open(
      buildWhatsAppUrl(text.trim() || t("prefill")),
      "_blank",
      "noopener,noreferrer"
    );
    setOpenState(false);
  }

  return (
    <WhatsAppContext.Provider value={{ open, close }}>
      {children}
      {!openState && (
        <button
          type="button"
          onClick={() => open()}
          aria-label={t("trigger")}
          className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-lg transition hover:bg-ink/80 sm:bottom-8 sm:right-8"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M20.5 3.5A11 11 0 0 0 2.1 17.3L1 23l5.9-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.5.7.7-3.4-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.4.1-.3c0-.1 0-.3 0-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3a2.1 2.1 0 0 0-.7 1.6 3.7 3.7 0 0 0 .8 2 8.5 8.5 0 0 0 3.3 3.1 11 11 0 0 0 3.2 1.2 3 3 0 0 0 1.9.1 2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c-.1-.2-.3-.2-.6-.3Z" />
          </svg>
        </button>
      )}
      {openState && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-ink/50"
            aria-label={t("close")}
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-title"
            className="relative w-full max-w-md bg-white p-8 shadow-2xl"
          >
            <h2 id="whatsapp-title" className="font-display text-2xl font-bold">
              {t("title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mist">{t("subtitle")}</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("placeholder")}
              rows={4}
              className="mt-6 w-full resize-none border border-ink/15 px-4 py-3 text-sm outline-none focus:border-ink"
            />
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={close}
                className="text-[11px] uppercase tracking-[0.14em] text-mist"
              >
                {t("close")}
              </button>
              <button type="button" onClick={send} className="btn-pill">
                {t("send")}
              </button>
            </div>
          </div>
        </div>
      )}
    </WhatsAppContext.Provider>
  );
}

export function WhatsAppTrigger({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  const { open } = useWhatsApp();
  return (
    <button type="button" onClick={() => open()} className={className}>
      {label}
    </button>
  );
}
