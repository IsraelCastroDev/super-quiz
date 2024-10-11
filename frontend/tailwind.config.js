/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "nile-blue": {
          50: "#f2f8fd",
          100: "#e5eff9",
          200: "#c4ddf3",
          300: "#91c1e8",
          400: "#56a2da",
          500: "#3085c7",
          600: "#2069a9",
          700: "#1b5489",
          800: "#1a4872",
          900: "#1a3b5b",
          950: "#12273f",
        },
        danube: {
          50: "#f3f8fb",
          100: "#e4edf5",
          200: "#cfe1ee",
          300: "#aecde2",
          400: "#88b2d2",
          500: "#6191c2",
          600: "#5881b8",
          700: "#4d6fa8",
          800: "#435c8a",
          900: "#3a4d6e",
          950: "#273044",
        },
      },
    },
  },
  plugins: [],
};
