const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Exo\\ 2", ...defaultTheme.fontFamily.sans],
      header: ["Fira\\ Sans", ...defaultTheme.fontFamily.sans]
    },
    container: {
      center: true,
      padding: "1rem"
    }
  },
  variants: {
    extend: {
      backgroundColor: ["even", "odd"]
    }
  },
  plugins: [require("tailwindcss-debug-screens")]
};
