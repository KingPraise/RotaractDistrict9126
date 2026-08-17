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
        rotaract: {
          cranberry: {
            DEFAULT: '#D91B5C',
            deep: '#A70C43',
            glow: '#FF2E7E',
          },
          blue: {
            royal: '#00246C',
            deep: '#001645',
          },
          gold: {
            accent: '#F7A81B',
          },
          surface: {
            canvas: '#080C14',
            card: 'rgba(255, 255, 255, 0.05)',
            border: 'rgba(255, 255, 255, 0.12)',
          },
        },
      },
      backdropBlur: {
        glass: '16px',
      },
      screens: {
        mobile: '375px',
        desktop: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
