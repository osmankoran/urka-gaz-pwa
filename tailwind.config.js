/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'gas-argon': '#3B82F6',
          'gas-oxygen': '#10B981',
          'gas-nitrogen': '#F59E0B',
          'gas-lpg': '#EF4444',
        }
      },
    },
    plugins: [],
  }
