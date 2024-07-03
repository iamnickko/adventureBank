/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whiskey: "#8B572A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
