/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",       // dla Next.js App Router
      "./components/**/*.{js,ts,jsx,tsx}" // dla komponentów
    ],
    theme: {
      extend: {
        boxShadow:{
          'custom-strong': '5px 10px 15px rgba(0,0,0,0.3)'
        }
      },
    },
    plugins: [],
  }
  