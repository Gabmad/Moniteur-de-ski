import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0b0b0b",
          muted: "#3a3732",
          faint: "#8a847c",
        },
        cream: {
          DEFAULT: "#f7f4ef",
          dark: "#ebe6dc",
        },
        gold: {
          DEFAULT: "#c4a574",
          light: "#d4bc94",
          dark: "#a38456",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      letterSpacing: {
        luxury: "0.22em",
        wide: "0.14em",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
