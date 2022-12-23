/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem" },
    },
    extend: {
      fontFamily: {
        title: ["Varela Round", "sans-serif"],
      },
      colors: {
        primary: "#a6c7e7",
        "primary-600": "rgb(142, 173, 204)",
        "primary-800": "#313C4E",
      },
      spacing: {
        navHeight: "80px",
        availableHeight: "calc(100vh - 80px)",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "2200px",
    },
  },
  plugins: [],
};
