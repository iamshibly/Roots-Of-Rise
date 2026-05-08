import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#0B6B3A',
          'green-dark': '#094f2b',
          'green-light': '#E8F5E9',
          'green-muted': '#d1ead2',
          blue: '#2563EB',
          'blue-light': '#EFF6FF',
          gold: '#A07850',
        },
        neutral: {
          bg: '#F8FAFC',
          text: '#111827',
          muted: '#4B5563',
          border: '#E5E7EB',
          light: '#F3F4F6',
        },
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0B6B3A 0%, #2563EB 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, #094f2b 0%, #1d4ed8 100%)',
        'green-radial': 'radial-gradient(ellipse at top, #0B6B3A, #094f2b)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(9,79,43,0.85) 0%, rgba(11,107,58,0.7) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'count-up': 'countUp 2s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
      },
      boxShadow: {
        'brand': '0 4px 24px rgba(11,107,58,0.15)',
        'brand-lg': '0 8px 40px rgba(11,107,58,0.2)',
        'card': '0 2px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      },
    },
  },
  plugins: [],
}

export default config
