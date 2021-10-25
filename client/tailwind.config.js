module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        skin: "var(--color-text-skin)",
        indicator: "var(--color-indicator)",
        "player-main": "var(--color-player-main)",
        "player-secondary": "var(--color-player-secondary)",
      },
      backgroundColor: {
        skin: "var(--color-skin)",
        main: "var(--color-main)",
        box: "var(--color-box)",
        indicator: "var(--color-indicator)",
        "player-main": "var(--color-player-main)",
        "player-secondary": "var(--color-player-secondary)",
        "forecast-arrow": "var(--color-forecast-arrow)",
      },
      backgroundImage: {
        artwork: "var(--bg-artwork)",
      },
      fontFamily: {
        rubik: "Rubik, sans-serif",
        merriweather: "Merriweather, serif",
      },
      gradientColorStops: {
        skin: {
          start: "var(--color-fill)",
          middle: "var(--color-via)",
          end: "var(--color-to)",
        },
      },
      borderColor: {
        skin: "var(--color-border)",
      },
      fill: {
        wave: "var(--color-wave)",
      },
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
