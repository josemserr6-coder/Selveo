/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#EDE7E0",
          light: "#F6F3EF",
          dark: "#E2DACD",
        },
        gold: {
          DEFAULT: "#B3925F",
          light: "#D3BD93",
          dark: "#8C6F45",
        },
        charcoal: {
          DEFAULT: "#3E3D3B",
          light: "#6B6862",
        },
      },
      fontFamily: {
        serif: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        fadeIn: "fadeIn 1.2s ease forwards",
      },
    },
  },
  plugins: [],
};
