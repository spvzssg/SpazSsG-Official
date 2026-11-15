import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'electric-cyan': '#00DDF5',
        'burnt-orange': '#FF791D',
        'metallic-silver': '#D9DDE2',
        'midnight-black': '#08090C',
        'charcoal': '#151515',
      },
      spacing: {
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '32px',
        8: '40px',
        9: '48px',
        10: '64px',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        'full': '9999px',
      },
      fontSize: {
        'xxs': '10px',
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
      },
      fontWeight: {
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      animation: {
        'fast': 'fadeIn 150ms ease-in-out',
        'normal': 'fadeIn 200ms ease-in-out',
        'slow': 'fadeIn 300ms ease-in-out',
        'slower': 'fadeIn 400ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
