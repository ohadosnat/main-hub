module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      rubik: "Rubik, sans-serif",
      merriweather: "Merriweather, serif",
    },
    extend: {
      screens: {
        landscape: {
          raw: "(max-device-width: 1024px) and (orientation: landscape)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
