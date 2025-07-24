/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "toast-in": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { transform: "translateY(20%)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "toast-out": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(-20%)", opacity: "0.5" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
      },
      animation: {
        "toast-in": "toast-in 0.5s ease-in-out forwards",
        "toast-out": "toast-out 0.5s ease-in-out forwards",
      },
      transform: ["hover", "group-hover"],
      utilities: {
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
      },
    },
  },
  plugins: [],
};
