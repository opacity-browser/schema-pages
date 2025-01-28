const path = require("path")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [path.resolve(__dirname, "./src/**/*.{js,ts,jsx,tsx}")],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Avenir", "Apple SD Gothic Neo"]
      },
      colors: {
        text: {
          DEFAULT: "#222222"
        },
        background: {
          DEFAULT: "#ffffff"
        },
        primary: {
          DEFAULT: "#222222",
          50: "#e6e6e6",
          100: "#cccccc",
          200: "#b3b3b3",
          300: "#999999",
          400: "#808080",
          500: "#666666",
          600: "#4d4d4d",
          700: "#333333",
          800: "#292929",
          900: "#222222"
        },
        onPrimary: {
          DEFAULT: "#ffffff",
          50: "#ffffff",
          100: "#f2f2f2",
          200: "#e6e6e6",
          300: "#d9d9d9",
          400: "#cccccc",
          500: "#bfbfbf",
          600: "#a6a6a6",
          700: "#8c8c8c",
          800: "#737373",
          900: "#595959"
        }
      }
    }
  },
  plugins: []
}
