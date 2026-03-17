/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        urps: {
          primary: '#1a5276',
          secondary: '#2980b9',
          accent: '#f39c12',
          dark: '#2c3e50',
          light: '#ecf0f1',
          success: '#27ae60',
          danger: '#e74c3c',
          warning: '#f1c40f',
          sidebar: '#1e3a5f',
          'sidebar-hover': '#2c5282',
        }
      }
    },
  },
  plugins: [],
}
