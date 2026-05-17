/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Noto Sans SC', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Noto Serif SC', 'serif'],
      },
      colors: {
        'star-dark': '#0a0e27',
        'star-gold': '#ffd700',
        'star-purple': '#8b5cf6',
      },
    },
  },
  plugins: [],
};
