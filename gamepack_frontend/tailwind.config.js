/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark': '#121212',
        'primary': '#9333ea', // Purple
        'secondary': '#3b82f6', // Blue
        'accent': '#f97316', // Orange
        'light-gray': '#1f1f1f',
        'text-main': '#e5e7eb',
        'text-muted': '#9ca3af',
      },
      fontFamily: {
        sans: ['"Rajdhani"', 'sans-serif'],
        display: ['"Orbitron"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};