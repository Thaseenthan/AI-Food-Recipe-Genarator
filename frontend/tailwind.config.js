/** @type {import('tailwindcss').Config} */
export default {
  // Ensure Tailwind scans the app files for class names
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
   darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
      }
    },
  },
  variants: {},
  plugins: [],
}

