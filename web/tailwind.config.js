/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.black[500],
        secondary: colors.indigo[500], //colors.gray[400],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
