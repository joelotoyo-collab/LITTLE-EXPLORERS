/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#4DBDF5',
          500: '#2AA3E6',
          600: '#1B84C4',
          700: '#166A9E',
        },
        sun: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FFD84D',
          400: '#FFC21A',
          500: '#EBA600',
        },
        tangerine: {
          50: '#FFF4EC',
          100: '#FFE4CF',
          200: '#FFC59B',
          300: '#FFA366',
          400: '#FF8A3D',
          500: '#E8701E',
        },
        mint: {
          50: '#ECFDF6',
          100: '#D1FAE8',
          200: '#A7F0D0',
          300: '#6EDCB0',
          400: '#3CC593',
          500: '#1FA876',
        },
        coral: {
          50: '#FFF1F1',
          100: '#FFE0E0',
          200: '#FFC2C2',
          300: '#FF9A9A',
          400: '#FF7575',
          500: '#E65555',
        },
        lilac: {
          50: '#F5F2FF',
          100: '#EAE4FD',
          200: '#D5CBF8',
        },
        cream: {
          50: '#FFFDF7',
          100: '#FFF8EC',
          200: '#FCEFD9',
        },
        ink: {
          50: '#F4F6FA',
          100: '#E3E8F1',
          300: '#A4AFC4',
          500: '#5B6784',
          700: '#343F5C',
          800: '#243050',
          900: '#18213A',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'ui-rounded', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(24, 33, 58, 0.25)',
        pop: '0 14px 0 -2px rgba(24, 33, 58, 0.12)',
        soft: '0 4px 14px -6px rgba(24, 33, 58, 0.22)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(10px, -18px, 0) rotate(8deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.6s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};
