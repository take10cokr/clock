/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ec5b13",
        "background-light": "#000000",
        "background-dark": "#000000",
      },
      fontFamily: {
        "display": ["Public Sans", "sans-serif"],
        "inter": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
  ],
}
