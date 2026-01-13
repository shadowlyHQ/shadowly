/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#666666',
        purple: {
          dark: '#1a0d2e',
          darker: '#0f0519',
          light: '#6b46c1',
          lighter: '#8b5cf6',
        },
      },
    },
  },
  plugins: [],
}
