import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          deep: "rgb(var(--bg-deep) / <alpha-value>)",
          dark: "rgb(var(--bg-dark) / <alpha-value>)",
        },
        // `white` is re-mapped to a CSS variable so cards/surfaces follow the theme.
        white: "rgb(var(--surface) / <alpha-value>)",
        gold: {
          DEFAULT: "#C9A45C",
          light: "#E4CE9E",
          dark: "#A8843C",
        },
        "pink-gold": {
          DEFAULT: "#D9A9A0",
          light: "#F0D4CF",
          dark: "#B87A72",
        },
        "off-black": "rgb(var(--ink) / <alpha-value>)",
        "review-grey": "rgb(var(--ink-soft) / <alpha-value>)",
        "male-tint": {
          DEFAULT: "#A9B4B8",
          dark: "#6B7B80",
          light: "#D4DDE0",
        },
        "female-tint": {
          DEFAULT: "#E7C4C0",
          dark: "#C49490",
          light: "#F5E0DE",
        },
        // Literal white for text sitting on coloured badges / overlays.
        "on-accent": "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        bangla: ["var(--font-hind-siliguri)", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(43, 43, 43, 0.06)",
        "card-hover": "0 8px 24px rgba(43, 43, 43, 0.10)",
        panel: "0 0 40px rgba(43, 43, 43, 0.12)",
      },
      maxWidth: {
        container: "1280px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
