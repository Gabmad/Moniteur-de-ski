import Link from "next/link";
import { type Locale, getLocalizedPath, businessInfo } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { WhatsAppTrigger } from "@/components/whatsapp/WhatsAppProvider";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ locale, dict }: FooterProps) {

  return (
    <footer className="bg-ink text-white/60">
      <div className="container-narrow py-16 md:py-20">
        <div className="flex flex-col items-center text-center">
          <p className="font-sans text-[10px] font-medium uppercase tracking-luxury text-gold">
            Les Trois Vallées
          </p>
          <p className="mt-3 font-serif text-3xl text-white">{dict.brand}</p>
          <p className="mt-4 max-w-md text-[13px] font-light leading-relaxed">
            {dict.footer.tagline}
          </p>

          <div className="gold-rule mt-8" />

          <nav className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <Link
              href={getLocalizedPath(locale, "skiLessons")}
              className="text-[11px] font-medium uppercase tracking-luxury text-white/50 transition hover:text-gold"
            >
              {dict.nav.skiLessons}
            </Link>
            <Link
              href={getLocalizedPath(locale, "touring")}
              className="text-[11px] font-medium uppercase tracking-luxury text-white/50 transition hover:text-gold"
            >
              {dict.nav.touring}
            </Link>
            <Link
              href={getLocalizedPath(locale, "photography")}
              className="text-[11px] font-medium uppercase tracking-luxury text-white/50 transition hover:text-gold"
            >
              {dict.nav.photography}
            </Link>
            <Link
              href={getLocalizedPath(locale, "about")}
              className="text-[11px] font-medium uppercase tracking-luxury text-white/50 transition hover:text-gold"
            >
              {dict.nav.about}
            </Link>
            <Link
              href={getLocalizedPath(locale, "contact")}
              className="text-[11px] font-medium uppercase tracking-luxury text-white/50 transition hover:text-gold"
            >
              {dict.nav.contact}
            </Link>
          </nav>

          <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href={getLocalizedPath(locale, "courchevel")}
              className="text-[11px] font-medium uppercase tracking-luxury text-white/40 transition hover:text-gold"
            >
              Courchevel
            </Link>
            <Link
              href={getLocalizedPath(locale, "meribel")}
              className="text-[11px] font-medium uppercase tracking-luxury text-white/40 transition hover:text-gold"
            >
              Méribel
            </Link>
            <Link
              href={getLocalizedPath(locale, "valThorens")}
              className="text-[11px] font-medium uppercase tracking-luxury text-white/40 transition hover:text-gold"
            >
              Val Thorens
            </Link>
          </nav>

          <div className="mt-10 flex flex-col items-center gap-2 text-[13px] font-light">
            <WhatsAppTrigger
              label={dict.footer.whatsapp}
              className="text-white/70 transition hover:text-gold"
            />
            <a
              href={`tel:${businessInfo.phone}`}
              className="transition hover:text-gold"
            >
              {businessInfo.phoneDisplay}
            </a>
            <a
              href={`mailto:${businessInfo.email}`}
              className="transition hover:text-gold"
            >
              {businessInfo.email}
            </a>
          </div>

          <p className="mt-8 text-[11px] uppercase tracking-wide text-white/30">
            {businessInfo.areasServed.join("  ·  ")}
          </p>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-[11px] tracking-wide text-white/30">
          © {new Date().getFullYear()} {dict.brand} — Trois Vallées. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
