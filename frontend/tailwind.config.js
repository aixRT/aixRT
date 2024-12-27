/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aixrt': {
          purple: '#5D3E8D',
          navy: '#1A237E',
          gold: '#FFD700',
          red: '#8B0000',
          black: '#1A1A1A',
        },
        primary: '#5D3E8D', // Purple as primary
        secondary: '#1A237E', // Navy as secondary
        accent: '#FFD700', // Gold as accent
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
