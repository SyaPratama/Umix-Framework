/** @type {import('tailwindcss').Config} */
export default {
  content: ["./Views/**/*.ejs"],
  darkMode:'class',
  theme: {
    screens: {
      "sm": "320px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1440px",
      "2xl": "1920px",
      "3xl": "3840px",
    },
    extend: {},
  },
  plugins: [],
}

