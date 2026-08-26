"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  type Locale,
  type RouteKey,
  getLocalizedPath,
  primaryNav,
} from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

const navItems: { key: RouteKey; labelKey: keyof Dictionary["nav"] }[] =
  primaryNav.map((key) => ({
    key,
    labelKey: key as keyof Dictionary["nav"],
  }));

export default function Header({ locale, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-ink/70 via-ink/25 to-transparent">
      <div className="container-narrow flex h-[4.5rem] items-center justify-between md:h-24">
        <Link
          href={getLocalizedPath(locale, "home")}
          className="relative z-50 text-white"
        >
          <span className="block font-sans text-[10px] font-medium uppercase tracking-luxury text-gold">
            Les Trois Vallées
          </span>
          <span className="mt-0.5 block font-serif text-xl font-normal leading-none tracking-wide md:text-2xl">
            {dict.brand}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 xl:gap-10 lg:flex"
          aria-label="Main"
        >
          {navItems.map(({ key, labelKey }) => (
            <Link
              key={key}
              href={getLocalizedPath(locale, key)}
              className="font-sans text-[11px] font-medium uppercase tracking-luxury text-white/80 transition hover:text-gold"
            >
              {dict.nav[labelKey]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-8 lg:flex">
          <LanguageSwitcher currentLocale={locale} />
        </div>

        <button
          type="button"
          className="relative z-50 inline-flex h-10 w-10 items-center justify-center text-white lg:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col items-end gap-1.5">
            <span
              className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "w-5 translate-y-[7px] rotate-45" : "w-6"}`}
            />
            <span
              className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`}
            />
            <span
              className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "w-5 -translate-y-[7px] -rotate-45" : "w-5"}`}
            />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-ink transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          className="flex h-full flex-col items-center justify-center gap-8"
          aria-label="Mobile"
        >
          {navItems.map(({ key, labelKey }) => (
            <Link
              key={key}
              href={getLocalizedPath(locale, key)}
              className="font-serif text-3xl text-white transition hover:text-gold"
              onClick={() => setMenuOpen(false)}
            >
              {dict.nav[labelKey]}
            </Link>
          ))}
          <Link
            href={getLocalizedPath(locale, "contact")}
            className="btn-primary mt-4"
            onClick={() => setMenuOpen(false)}
          >
            {dict.nav.bookCta}
          </Link>
          <div className="mt-6">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </nav>
      </div>
    </header>
  );
}
