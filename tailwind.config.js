/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1a1a2e',
        parchment: '#f4ecd8',
        ember: '#c1440e',
        jade: '#2d6a4f',
      },
    },
  },
  plugins: [],
}