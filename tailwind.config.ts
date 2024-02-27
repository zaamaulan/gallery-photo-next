import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        pink: {
          50: "#fff1f3",
          100: "#ffe3e7",
          200: "#ffc0cb",
          300: "#ffa2b3",
          400: "#fe6e8b",
          500: "#f83b66",
          600: "#e51951",
          700: "#c20e43",
          800: "#a20f40",
          900: "#8a113c",
          950: "#4d041c",
        },
        mauvelous: {
          50: "#fef2f3",
          100: "#fee5ea",
          200: "#fccfd9",
          300: "#f9a8ba",
          400: "#f78da7",
          500: "#ed4674",
          600: "#d9255e",
          700: "#b71950",
          800: "#991849",
          900: "#831844",
          950: "#490821",
        },
      },
    },
  },
  plugins: [],
};
export default config;
