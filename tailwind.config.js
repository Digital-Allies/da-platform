/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F9F6F0',
        charcoal: '#2D2D2D',
        'neutral-light': '#E0DDD5',
        alert: '#C5301A',
        // brand is set via CSS variable per client: var(--brand)
      },
      fontFamily: {
        headline: ['Lexend Deca', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['11px', '1.5'],
        sm: ['13px', '1.5'],
        base: ['14px', '1.6'],
        md: ['16px', '1.6'],
        lg: ['18px', '1.4'],
        xl: ['24px', '1.3'],
        '2xl': ['32px', '1.2'],
        '3xl': ['48px', '1.15'],
        '4xl': ['64px', '1.1'],
      },
      spacing: {
        // 8px base scale from design system
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '48px',
        6: '64px',
        7: '80px',
        8: '120px',
      },
      maxWidth: {
        site: '1280px',
        compact: '1024px',
      },
      borderColor: {
        DEFAULT: '#2D2D2D',
      },
      animation: {
        'slide-up': 'slideInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        spin: 'spin 0.8s linear infinite',
      },
      keyframes: {
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
