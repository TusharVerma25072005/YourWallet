/** @type {import('tailwindcss').Config} */
export default {
  content:[ 
  "./index.html",
  "./src/**/*.{html,js,ts,jsx,tsx}"
],
  theme: {
    extend: {
      colors: require('tailwindcss/colors'),
    },
  },
  plugins: [],
}

