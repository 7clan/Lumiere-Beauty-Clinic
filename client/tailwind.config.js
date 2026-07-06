/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#fffaf3",
        pearl: "#f8f2ec",
        blush: "#eeb7bd",
        rosewood: "#8f4d59",
        taupe: "#a68f7e",
        champagne: "#c8a45d",
        ink: "#2f2a27"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(97, 66, 53, 0.12)"
      }
    }
  },
  plugins: []
};
