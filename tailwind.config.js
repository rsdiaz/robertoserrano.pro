/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        text: 'text 5s ease infinite',
        glow: 'glow 0.8s both'
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          }
        },
        glow: {
          "from": {
            'opacity': '0'
          },
          "65%": {
            'opacity': '1',
            'text-shadow': '0 0 25px white'
          },
          "75%": {
            'opacity': '1'
          }
        }
      }
    },
  },
  plugins: [],
};