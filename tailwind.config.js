/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(top|left|h|w)-([0-9]+)/,
    },
  ],
  plugins: [],
};
