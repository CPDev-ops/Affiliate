/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'redNav': '#680817',
        'redCard': '#F55757',
        'yellowText': '#FFFF00',
        'greenMain': '#06DE0E',
        'yellowSubText': '#FBC609',
        'blueBorder': '#4276FD',
        'blueHover': '#274697',
        'blueSubText': '#3840F7',
        /* VALORES PARA LAS CARDS */
        'gradientYellow': '#F6CB50',
        'gradientYellowDark': '#AA1401',
        'gradientOrange': '#FB602B',
        'gradientRose': '#FF388F',
        'gradientGreen': '#58D189',
        'gradientGreenDark': '#1D6D66',
        'gradientBlueLight': '#79BFF0',
        'gradientBlue': '#0C1C73',
        'gradientPurple': '#E052FE',
        'gradientPurpleDark': '#3409B7',
        /* BORDERS COLORS */
        'colorRose': '#FF00FF',
        'colorCyan':'#7AC4FB',
        'colorGreen':'#56C883',
        'colorYellow': '#F6CB50',



      }
    },
  },
  plugins: [],
}