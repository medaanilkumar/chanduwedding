/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Great Vibes"', '"Pinyon Script"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          50:  '#fdf9ee',
          100: '#f9efc8',
          200: '#f1d98e',
          300: '#e8c05c',
          400: '#d9a84e',
          500: '#c8913a',
          600: '#a87030',
          700: '#8a5526',
          800: '#6e3f1f',
          900: '#4a2a14',
        },
        sage: {
          50:  '#f4f7ef',
          100: '#e3ead2',
          200: '#c5d4a4',
          300: '#a3b97a',
          400: '#8a9a6b',
          500: '#6f7f54',
          600: '#586542',
          700: '#424e33',
          800: '#2e3724',
          900: '#1c2216',
        },
        cream: {
          50:  '#fefdf8',
          100: '#fdf8ec',
          200: '#fbf0d4',
          300: '#f7e4b4',
          400: '#f0d48e',
          500: '#e8c068',
        },
        dark: {
          900: '#0f0e0a',
          800: '#1a1912',
          700: '#252318',
          600: '#322f20',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fall': 'fall linear forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bob': 'bob 2s ease-in-out infinite',
        'fade-up': 'fadeUp 1s ease forwards',
        'scale-in': 'scaleIn 0.8s ease forwards',
        'ribbon': 'ribbon 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(217,168,78,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(217,168,78,0.8), 0 0 100px rgba(217,168,78,0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fall: {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        ribbon: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, #c8913a, #f1d98e, #e8c05c, #c8913a)',
        'hero-gradient': 'radial-gradient(ellipse at top, #2e3724 0%, #1a1912 50%, #0f0e0a 100%)',
        'section-gradient': 'linear-gradient(180deg, #0f0e0a 0%, #1a1912 100%)',
      },
    },
  },
  plugins: [],
}
