/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ---- Paleta Sleepy ---- */
        sleepy: {
          // Colores base
          accent: {
            DEFAULT: '#ec8013', // Acento (claro y oscuro)
            hover: '#d4881c',
            disabled: '#fbd69e',
          },

          // Sistema de colores claro (light mode)
          light: {
            bg: {
              primary: '#fcfaf8', // Fondo principal claro
              surface: '#f3ede7', // Background secundario claro
              input: '#ffffff',   // Fondo de inputs claro
            },
            text: {
              primary: '#1b140d',   // Texto principal claro
              secondary: '#9a734c', // Texto secundario claro
              onAccent: '#221a11',  // Texto sobre acento
            },
            border: {
              DEFAULT: '#e7dbcf', // Bordes claros
              input: '#e7dbcf',   // Bordes de inputs claros
            }
          },

          // Sistema de colores oscuro (dark mode)
          dark: {
            bg: {
              primary: '#221a11', // Fondo principal oscuro
              surface: '#483623', // Fondo de tarjetas/botones oscuros
              input: '#332619',   // Fondo de inputs oscuros
            },
            text: {
              primary: '#ffffff',   // Texto principal oscuro
              secondary: '#c9ad92', // Texto secundario oscuro
              onAccent: '#221a11',  // Texto sobre acento
            },
            border: {
              DEFAULT: '#483623', // Bordes oscuros
              input: '#674d32',   // Bordes de inputs oscuros
            }
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'IBM Plex Sans', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled', 'hover', 'dark'],
      textColor: ['disabled', 'hover', 'dark'],
      borderColor: ['disabled', 'hover', 'dark'],
    },
  },
  plugins: [],
}

