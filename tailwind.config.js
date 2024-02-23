/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aRoboto: ['"Roboto", sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        aTextColor: "#131418",
        aBgColor: "#FFFFFF",
        aPrimaryColor: "#FF6600",
      },
    },
  },
  plugins: [],
};
