/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep Dark SaaS Palette
        dark: {
          900: '#0a0a0a',
          800: '#141414',
          700: '#1f1f1f',
        },
        // Premium Accents
        accent: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'ease-out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      },
    },
  },
  plugins: [],
}
