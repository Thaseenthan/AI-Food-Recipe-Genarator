/** @type {import('tailwindcss').Config} */
export default {
  // Ensure Tailwind scans the app files for class names
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

