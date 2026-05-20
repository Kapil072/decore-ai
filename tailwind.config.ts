import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void:  '#030305',
        space: '#080812',
      },
      fontFamily: {
        sans:  ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono:  ['Space Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow':    'spin 8s linear infinite',
        'spin-reverse': 'spin 12s linear infinite reverse',
        'float':        'float 4s ease-in-out infinite',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-void':   'radial-gradient(ellipse at center, #1a0533 0%, #030305 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
