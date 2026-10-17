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
        ember: '#c8102e', // kabuki crimson
        jade: '#2d6a4f',
        // Traditional Japanese palette
        kon: '#16090b', // lacquer black
        shu: '#c8102e', // crimson
        gold: '#b8963e',
        washi: '#f6f0e0',
        gofun: '#fcf8ee',
      },
      fontFamily: {
        display: ['"Shippori Mincho"', '"Hiragino Mincho ProN"', 'serif'],
      },
    },
  },
  plugins: [],
}