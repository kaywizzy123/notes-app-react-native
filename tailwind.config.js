/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        alabaster: "#fafafa",
        "governor-bay": "#3830a3",
        // Lighter accent used in dark mode wherever governor-bay is a
        // foreground (text/icon) color — #3830a3 is too dark to read on
        // dark surfaces. Background usages of governor-bay are unaffected.
        "governor-bay-light": "#818cf8",
      },
    },
  },
  plugins: [],
};
