/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: "#141414",
        "surface-card": "#18181A",
        "surface-pill": "#1F1F23",
        "surface-border": "#2A2A2E",
        "accent-yellow": "#FFC107",
        "accent-yellow-light": "#FFD54F",
        "accent-yellow-dark": "#FFA000",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        kannada: ["var(--font-noto-kannada)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
