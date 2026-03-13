import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#07070f',
        bg2:     '#0d0d1a',
        purple:  { DEFAULT: '#8b5cf6', dark: '#7c3aed', glow: 'rgba(139,92,246,0.15)' },
        blue:    { DEFAULT: '#3b82f6', dark: '#2563eb' },
        cyan:    { DEFAULT: '#06b6d4' },
        glass:   'rgba(255,255,255,0.04)',
        border:  'rgba(255,255,255,0.08)',
        muted:   '#64748b',
        dim:     '#334155',
        accent:  '#8b5cf6',
        surface: {
          DEFAULT: '#0d0d1a',
          card:    '#111120',
          border:  'rgba(255,255,255,0.08)',
        },
        brand: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand':  'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(139,92,246,0.2)',
        'glow-blue':   '0 0 30px rgba(59,130,246,0.2)',
        'glow-sm':     '0 0 15px rgba(139,92,246,0.15)',
      },
      animation: {
        'fade-in':    'fade-in 0.5s ease forwards',
        'slide-in':   'slide-in 0.4s ease forwards',
        'float':      'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
