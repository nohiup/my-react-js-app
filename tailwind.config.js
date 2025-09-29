/** @type {import('tailwindcss').Config import('./src/index.css')} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}", // tuỳ dự án
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)", // 🔑 lấy giá trị từ biến CSS
      },
    },
  },
  plugins: [],
};