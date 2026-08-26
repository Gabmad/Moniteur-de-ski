"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

interface LangSetterProps {
  locale: Locale;
}

export default function LangSetter({ locale }: LangSetterProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
