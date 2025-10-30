/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",       // dla Next.js App Router
      "./components/**/*.{js,ts,jsx,tsx}" // dla komponentów
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  