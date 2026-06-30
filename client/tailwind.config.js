/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1c3b2f',
        },
        secondary: {
          DEFAULT: '#e2b74a',
        },
        accent: {
          teal: '#2a6f53',
        },
        // Direct flat mappings for ease of use as well
        'brand-primary': '#1c3b2f',
        'brand-secondary': '#e2b74a',
        'brand-teal': '#2a6f53',
      },
      borderRadius: {
        'soft': '1rem',
      },
    },
  },
  plugins: [],
}
