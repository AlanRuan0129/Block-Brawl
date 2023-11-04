/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'power-off-purple':'#e560e0',
        'power-off': '#f48cef',
        'power-font': '#fdf0a2',
      },
      textColor: {
        'custom-pink': '#e560e0'
      },
      backgroundImage: {
        'homepage': "url('../public/assets/homepage.jpg')",
        'loginpage': "url('../public/assets/loginpage.jpg')",
        'loading': "url('../public/assets/loader.gif')",
      },
      fontFamily: {
        'league-spartan': ['League Spartan', 'sans-serif'],
        'nanum-pen': ['Nanum Pen Script', 'sans'],
        'luckiest-guy': ['Luckiest Guy', 'sans'],
      },
      minWidth: {
        '80rem': '80rem',
      },
    },
  },
  plugins: [],
}

