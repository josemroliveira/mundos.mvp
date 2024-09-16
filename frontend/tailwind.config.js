/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#D7FF00',
        'secondary': '#333',
        'background': '#1c1c1c',
        'foreground': '#ffffff',
      },
    },
  },
  plugins: [],
}