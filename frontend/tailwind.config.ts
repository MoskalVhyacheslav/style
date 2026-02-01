import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#0a0a0a',
        paper: '#fafafa',
        accent: '#2d2d2d',
        muted: '#737373'
      }
    }
  },
  plugins: []
};

export default config;
