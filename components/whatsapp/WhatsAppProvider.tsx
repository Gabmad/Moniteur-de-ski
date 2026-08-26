"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { buildWhatsAppUrl } from "@/lib/booking";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

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

interface WhatsAppProviderProps {
  dict: Dictionary["whatsapp"];
  children: ReactNode;
}

export function WhatsAppProvider({ dict, children }: WhatsAppProviderProps) {
  const [openState, setOpenState] = useState(false);
  const [text, setText] = useState("");

  const open = useCallback((prefill?: string) => {
    setText(prefill ?? "");
    setOpenState(true);
  }, []);

  const close = useCallback(() => setOpenState(false), []);

  function send() {
    const url = buildWhatsAppUrl(text.trim() || "Bonjour Gabriel,");
    window.open(url, "_blank", "noopener,noreferrer");
    setOpenState(false);
  }

  return (
    <WhatsAppContext.Provider value={{ open, close }}>
      {children}
      {!openState && (
        <button
          type="button"
          onClick={() => open()}
          aria-label={dict.trigger}
          className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-lg shadow-ink/20 transition hover:bg-gold-light sm:bottom-8 sm:right-8"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10.5h8M8 14h5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 18.5V7.2A2.2 2.2 0 0 1 6.7 5h10.6A2.2 2.2 0 0 1 19.5 7.2v7.1a2.2 2.2 0 0 1-2.2 2.2H8.2L4.5 18.5Z"
            />
          </svg>
        </button>
      )}
      {openState && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-ink/50"
            aria-label={dict.close}
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-title"
            className="relative w-full max-w-md bg-cream p-8 shadow-2xl sm:mb-0 mb-20"
          >
            <p className="eyebrow">{dict.trigger}</p>
            <h2
              id="whatsapp-title"
              className="mt-3 font-serif text-3xl text-ink"
            >
              {dict.title}
            </h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted">
              {dict.subtitle}
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={dict.placeholder}
              rows={4}
              className="input-luxury mt-6 resize-none"
            />
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={close}
                className="text-[11px] font-medium uppercase tracking-luxury text-ink-faint transition hover:text-ink"
              >
                {dict.close}
              </button>
              <button type="button" onClick={send} className="btn-primary">
                {dict.send}
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
