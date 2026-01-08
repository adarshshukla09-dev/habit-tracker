/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        // This adds the slow revolving effect for the stars
        "slow-spin": "spin 120s linear infinite",
      },
    },
  },
  plugins: [],
};
