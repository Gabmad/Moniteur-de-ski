"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import TestimonialCard from "@/components/TestimonialCard";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as { quote: string; author: string }[];
  const [index, setIndex] = useState(0);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="site-pad mx-auto max-w-site">
        <p className="text-center text-sm text-mist">{t("title")}</p>
        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((item) => (
              <TestimonialCard
                key={item.author}
                quote={item.quote}
                author={item.author}
              />
            ))}
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3">
          {items.map((item, i) => (
            <button
              key={item.author}
              type="button"
              aria-label={item.author}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${
                i === index ? "bg-ink" : "bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
