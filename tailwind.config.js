module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
      width: {
        'fit-content': 'fit-content'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
