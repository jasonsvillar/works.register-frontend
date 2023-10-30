/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily :{ 
        reydex: ["reydex","sans-serif"],
      }
    },
  },
  plugins: []
}