/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        // Nivel 0
        'firstColor0': '#D01111',
        'secondColor0': '#D01111',
        'thirdColor0': '#D01111',
        // Nivel 1
        'firstColor1': '#F5C74F',
        'secondColor1': '#B02307',
        'thirdColor1': '#B02307',
        // Nivel 2
        'firstColor2': '#FF3B88',
        'secondColor2': '#FB5F2F',
        'thirdColor2': '#7A032E',
        // Nivel 3
        'firstColor3': '#57D089',
        'secondColor3': '#217469',
        'thirdColor3': '#02352B',
        // Nivel 4
        'firstColor4': '#6BA9DF',
        'secondColor4': '#1B3284',
        'thirdColor4': '#031142',
        // Nivel 5
        'firstColor5': '#D64EFA',
        'secondColor5': '#4410BE',
        'thirdColor5': '#20045A',



      }
    },
  },
  plugins: [],
}