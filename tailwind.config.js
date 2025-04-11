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
          DEFAULT: '#005A99', // A BECU-like primary blue
          dark: '#004477', // Darker shade
        },
        secondary: {
          DEFAULT: '#008055', // A BECU-like green
          light: '#E6F2EE', // Lighter shade for backgrounds
        },
        accent: {
          DEFAULT: '#F58220', // An orange accent
        },
        neutral: {
          light: '#F8F9FA', // Very light gray
          medium: '#E9ECEF', // Light gray
          dark: '#6C757D', // Medium gray
          darker: '#343A40', // Dark gray
        },
      },
    },
  },
  plugins: [],
}
