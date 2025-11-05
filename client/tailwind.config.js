/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <- esto hace que Tailwind busque clases en todos los ficheros React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

