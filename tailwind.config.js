/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  // theme: {
  //   extend: {},
  // },
  theme: {
    extend: {
      fontFamily: {
        geosans: ["Geosans", "sans-serif"],
      },
      scale: {
        "-100": "-1",
      },
      height: {
        "-almost": "95vh"
      }
    },
  },
  plugins: [],
};
