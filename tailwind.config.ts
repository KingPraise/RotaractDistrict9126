import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './actions/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cranberry: {
          DEFAULT: '#981132',
          glow: '#A70C43',
          rose: '#D91B5C',
          light: '#E11D48',
          bg: 'rgba(152, 17, 50, 0.10)',
        },
        gold: {
          DEFAULT: '#D4A520',
          rotary: '#FFC72C',
          amber: '#F59E0B',
        },
        coral: '#F87171',
        surface: {
          cream: '#F8F5F2',
          'cream-alt': '#F8F5F4',
          dark: '#0F1624',
          'dark-deep': '#0A0E1A',
          canvas: '#080C14',
          card: '#1A1D2E',
        },
        text: {
          primary: '#1C1C1E',
          secondary: '#374151',
          muted: '#6B7280',
          light: '#9CA3AF',
          cream: '#ECEEF5',
        },
        status: {
          green: '#22C55E',
          'green-deep': '#059669',
          red: '#DC2626',
          amber: '#F59E0B',
          blue: '#3B82F6',
        },
        border: {
          light: 'rgba(0, 0, 0, 0.08)',
          dark: 'rgba(255, 255, 255, 0.10)',
          'dark-strong': 'rgba(255, 255, 255, 0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['109.3px', { lineHeight: '1.05', fontWeight: '900' }],
        'display-sm': ['96px', { lineHeight: '1.05', fontWeight: '900' }],
        'h1': ['64px', { lineHeight: '1.1', fontWeight: '900' }],
        'h2': ['47.8px', { lineHeight: '1.15', fontWeight: '900' }],
        'h3': ['38.4px', { lineHeight: '1.2', fontWeight: '900' }],
        'h4': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'body-lg': ['16.8px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'nav': ['13px', { lineHeight: '1.5', fontWeight: '500' }],
        'eyebrow': ['12px', { lineHeight: '1.3', fontWeight: '600' }],
        'caption': ['11.2px', { lineHeight: '1.5', fontWeight: '400' }],
        'card-title': ['18px', { lineHeight: '1.25', fontWeight: '700' }],
        'card-stat': ['17.6px', { lineHeight: '1.2', fontWeight: '900' }],
        'card-name': ['12.8px', { lineHeight: '1.2', fontWeight: '700' }],
        'card-role': ['10.9px', { lineHeight: '1.3', fontWeight: '600' }],
      },
      borderRadius: {
        'pill': '999px',
        'card-lg': '20px',
        'card': '16px',
        'card-sm': '12px',
        'button': '8px',
        'badge': '6px',
      },
      boxShadow: {
        'card': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-dark': '0 8px 32px rgba(0, 0, 0, 0.37)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'nav': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'button-primary': '0 4px 14px rgba(152, 17, 50, 0.35)',
        'button-white': '0 4px 14px rgba(0, 0, 0, 0.15)',
        'glow-cranberry': '0 0 40px rgba(152, 17, 50, 0.20)',
      },
      backdropBlur: {
        glass: '16px',
        'glass-sm': '12px',
      },
      screens: {
        mobile: '375px',
        tablet: '768px',
        desktop: '1440px',
      },
      maxWidth: {
        'content': '1200px',
        'page': '1364px',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'count-up': 'count-up 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
