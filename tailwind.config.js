/** @type {import('tailwindcss').Config} */
export default {
  safelist: [/^grid-cols-/, /^grid-rows-/],
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