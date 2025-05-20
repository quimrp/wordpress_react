/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'whatsapp-pattern': "url('https://img.freepik.com/vector-premium/patron-ecologico-verde-hecho-pequenos-iconos-ecologicos-fondo-ecologico-verde-costuras_109313-1298.jpg?w=740')",
      },
    },
  },
  plugins: [],
} 
