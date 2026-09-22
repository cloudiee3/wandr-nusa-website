/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand navy, sampled straight from the logo artwork.
        ink: {
          DEFAULT: '#011D39',
          900: '#010F1F',
          800: '#011629',
          700: '#011D39',
          600: '#0A2E52',
          500: '#14416E',
          400: '#2E5C8A',
          300: '#6C8CAD',
          200: '#AFC2D4',
          100: '#DDE5ED',
        },
        // Reef turquoise — the accent, pulled from the water in the photography.
        sea: {
          DEFAULT: '#12A0A8',
          700: '#0B7A82',
          600: '#0E8E96',
          500: '#12A0A8',
          400: '#38BCC2',
          300: '#7FD6D9',
          100: '#DBF2F3',
        },
        // Warm neutrals so the navy never feels cold.
        sand: {
          DEFAULT: '#F4EEE4',
          300: '#E6DACA',
          200: '#EFE7DA',
          100: '#FAF7F2',
        },
        ember: '#C87F3C',
      },
      fontFamily: {
        // Playfair Display for headings and the italic flourish; Figtree for
        // everything else, including the small tracked labels.
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { label: '0.18em' },
      maxWidth: { wrap: '80rem' },
      boxShadow: {
        lift: '0 24px 60px -24px rgba(1,29,57,0.35)',
        card: '0 2px 10px -2px rgba(1,29,57,0.10), 0 12px 32px -12px rgba(1,29,57,0.18)',
      },
      keyframes: {
        'fade-up': { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'none' } },
        'ken-burns': { from: { transform: 'scale(1.06)' }, to: { transform: 'scale(1.16)' } },
        drift: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(6deg)' },
        },
        'ripple-out': {
          '0%': { transform: 'scale(0.4)', opacity: 0.55 },
          '100%': { transform: 'scale(2.4)', opacity: 0 },
        },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.22,1,.36,1) both',
        'ken-burns': 'ken-burns 18s ease-out alternate infinite',
        drift: 'drift 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
