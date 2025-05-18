/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        darkbg: "#282727",
        backgroundColor: "#FFF8F5",
        textcolor : "#6C757D",
        primary: "#E64A19",
        secondary: "#FF784E",
        darkPrimary: '#1F1E1E',
      }
    },
  },
  plugins: [],
}

