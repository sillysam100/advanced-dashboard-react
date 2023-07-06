/** @type {import('tailwindcss').Config} */
export default {
  safelist: [/^col-span-/, /^row-span-/],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "corporate",
    ],
  },
  plugins: [require("daisyui")],
}