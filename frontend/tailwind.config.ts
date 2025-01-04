import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        quicksand: ['var(--font-quicksand)'],
        nunito: ['var(--font-nunito)'],
        comfortaa: ['var(--font-comfortaa)'],
        varelaround: ['var(--font-varela-round)'],
      },
    },
  },
  paths: {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"],
        "@components/*": ["./src/components/*"]
      }
    }
  },
  plugins: [],
} satisfies Config;