"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import type { PortfolioCategory } from "@/lib/photos";

const categories: PortfolioCategory[] = [
  "water",
  "trail",
  "snow",
  "life",
  "video",
];

export default function Header() {
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-3 focus:py-2"
      >
        Skip
      </a>

      <div className="site-pad mx-auto flex max-w-site items-center justify-between gap-4 py-[1.5vw] min-h-[4.25rem] md:min-h-[5rem]">
        <Link href="/" className="relative z-50 shrink-0 text-ink" onClick={() => setOpen(false)}>
          <span className="block font-display text-[11px] font-bold uppercase leading-[1.15] tracking-[0.02em] sm:text-[13px]">
            {tBrand("name")} <span className="font-bold">|</span>
          </span>
          <span className="block font-display text-[11px] font-bold uppercase leading-[1.15] tracking-[0.02em] sm:text-[13px]">
            {tBrand("role")}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex xl:gap-9"
          aria-label="Main"
        >
          <Link href="/about" className="nav-link text-[14px] text-ink/90 hover:text-ink">
            {t("about")}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setPortfolioOpen(true)}
            onMouseLeave={() => setPortfolioOpen(false)}
          >
            <Link
              href="/portfolio"
              className="nav-link text-[14px] text-ink/90 hover:text-ink"
              aria-expanded={portfolioOpen}
            >
              {t("portfolio")}
            </Link>
            <div
              className={`absolute left-1/2 top-full z-50 min-w-[11rem] -translate-x-1/2 pt-3 transition ${
                portfolioOpen
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              <div className="border border-ink/10 bg-white py-2 shadow-lg">
                {categories.map((key) => (
                  <Link
                    key={key}
                    href={{
                      pathname: "/portfolio/[category]",
                      params: { category: key },
                    }}
                    className="block px-4 py-2 text-[13px] text-ink/80 hover:bg-fog hover:text-ink"
                  >
                    {t(`categories.${key}`)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/blog" className="text-[14px] text-ink/90 hover:text-ink">
            {t("blog")}
          </Link>
          <Link href="/projects" className="text-[14px] text-ink/90 hover:text-ink">
            {t("projects")}
          </Link>
          <Link href="/shop" className="text-[14px] text-ink/90 hover:text-ink">
            {t("shop")}
          </Link>
          <Link href="/contact" className="text-[14px] text-ink/90 hover:text-ink">
            {t("contact")}
          </Link>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/cart"
            className="text-[13px] text-mist hover:text-ink"
          >
            {t("cart")}
          </Link>
          <Link href="/contact" className="btn-pill">
            {t("contactCta")}
          </Link>
        </div>

        <button
          type="button"
          className="relative z-50 inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? t("close") : t("menu")}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`block h-px bg-ink transition ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px bg-ink transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          className="flex h-full flex-col items-center justify-center gap-6 px-8 pt-16"
          aria-label="Mobile"
        >
          <Link href="/about" className="text-2xl" onClick={() => setOpen(false)}>
            {t("about")}
          </Link>
          <Link href="/portfolio" className="text-2xl" onClick={() => setOpen(false)}>
            {t("portfolio")}
          </Link>
          <div className="flex flex-col items-center gap-2 text-mist">
            {categories.map((key) => (
              <Link
                key={key}
                href={{
                  pathname: "/portfolio/[category]",
                  params: { category: key },
                }}
                className="text-base"
                onClick={() => setOpen(false)}
              >
                {t(`categories.${key}`)}
              </Link>
            ))}
          </div>
          <Link href="/blog" className="text-2xl" onClick={() => setOpen(false)}>
            {t("blog")}
          </Link>
          <Link href="/projects" className="text-2xl" onClick={() => setOpen(false)}>
            {t("projects")}
          </Link>
          <Link href="/shop" className="text-2xl" onClick={() => setOpen(false)}>
            {t("shop")}
          </Link>
          <Link href="/contact" className="btn-pill mt-2" onClick={() => setOpen(false)}>
            {t("contactCta")}
          </Link>
          <Link href="/cart" className="text-mist" onClick={() => setOpen(false)}>
            {t("cart")}
          </Link>
          <div className="pt-4">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
