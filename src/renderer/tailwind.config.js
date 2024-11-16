/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        's': '0 2px 10px 2px rgb(0 0 0 / 0.8)'
      },
      fontFamily: {
        title: ['"Roboto Mono"', 'monospace']
      },
      colors: {
        vm: '#DE1111'
      },
      
    }
  },
  plugins: []
}

