const designSystemConfig = require("../design-system/tailwind.config")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ...(designSystemConfig.content || []),
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      ...designSystemConfig.theme.extend
    }
  },
  plugins: [...(designSystemConfig.plugins || [])]
}
