import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.number-input::-webkit-inner-spin-button, .number-input::-webkit-outer-spin-button':
          {
            '-webkit-appearance': 'none',
            margin: '0',
          },
        '.number-input': {
          '-moz-appearance': 'textfield',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
