/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: "#0A1628",
          mid: "#1E3A5F",
          light: "#2A4A73",
        },
        gold: "#E8C547",
        water: "#64B5F6",
        sand: {
          DEFAULT: "#F5F0E8",
          dim: "#B8B0A0",
        },
        muted: "#8A9BB5",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
