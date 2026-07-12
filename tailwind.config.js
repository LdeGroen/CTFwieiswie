/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('ctf-ui/tailwind-preset')],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}