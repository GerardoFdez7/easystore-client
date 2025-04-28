import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#BC5BF5',
        secondary: '#10B981',
        background_light: '#F3F4F6',
        title: '#000000',
        text: '#423F3D',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};

export default config;
