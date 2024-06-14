/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      translate: {
        'full': '100%',
        '-full': '-100%'
      },
      fontFamily: {
        'poppins': 'Poppins, sans-serif',
      },
      colors: {
        'main': "#001427",
        'homeCard': "#00ACDF",
        'passwordCard': "#002643",
      }
    },
  },
  plugins: [],
}