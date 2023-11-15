/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "power-off-purple": "#e560e0",
        "power-off": "#f48cef",
        "power-font": "#fdf0a2",
        "pic-blue": "#4d7bb0",
        "pic-pink": "#ea90ad",
        block_bg_color: "#b2dff3",
        "game-pink": "#edacd2",
      },
      textColor: {
        "custom-pink": "#e560e0",
        "custom-text-pink": "#edacd2",
      },
      backgroundImage: {
        homepage: "url('../public/assets/homepage.jpg')",
        loginpage: "url('../public/assets/loginpage.jpg')",
        loading: "url('../public/assets/loader.gif')",
        room: "url('../public/assets/room.jpg')",
        floor: "url('../public/assets/floor.png')",
        floor_bean: "url('../public/assets/floor_bean.gif')",
        block_bean: "url('../public/assets/block_bean.png')",
        block: "url('../public/assets/block.png')",
        wall: "url('../public/assets/wall.png')",
        stall: "url('../public/assets/stall.png')",
        fire: "url('../public/assets/fire.gif')",
        wall_left: "url('../public/assets/wall_left.png')",
        wall_right: "url('../public/assets/wall_right.png')",
        wall_water: "url('../public/assets/wall_water.png')",
        roof_red: "url('../public/assets/roofRed.png')",
        roof_blue: "url('../public/assets/roofBlue.png')",
        win: "url('../public/assets/win.gif')",
      },

      minWidth: {
        "80rem": "80rem",
      },
      boxShadow: {
        "3d": "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;",
      },
    },
  },
  plugins: [],
};
