/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFCF9',
          100: '#FBF9F6', // Primary background
          200: '#F5F0EB', // Layer 2 background / subtle surface
          300: '#EFEAE3',
          400: '#E4DDD4',
        },
        charcoal: {
          DEFAULT: '#1C1A19',
          heading: '#151413',
          body:    '#4A4643',
          muted:   '#7A7470',
          light:   '#9C9590',
        },
        terracotta: {
          DEFAULT: '#C86D51',
          hover:   '#B85C40',
          light:   '#FDF2EE',
          border:  'rgba(200, 109, 81, 0.25)',
        },
        sand: {
          50:  '#FAF8F5',
          100: '#F2EDE7',
          200: '#E6DFC',
        }
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'Satoshi', 'sans-serif'],
        satoshi: ['Satoshi', '"Plus Jakarta Sans"', 'sans-serif'],
        inter:   ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"Geist Mono"', 'monospace'],
      },
      boxShadow: {
        'layer-1': '0 10px 30px -10px rgba(35, 25, 20, 0.04), 0 4px 12px -2px rgba(35, 25, 20, 0.02)',
        'layer-2': '0 25px 50px -12px rgba(35, 25, 20, 0.08), 0 8px 24px -4px rgba(35, 25, 20, 0.04)',
        'layer-3': '0 35px 70px -15px rgba(25, 18, 15, 0.12), 0 12px 30px -6px rgba(25, 18, 15, 0.06)',
        '3d-card': '0 20px 40px -15px rgba(45, 35, 30, 0.09), 0 1px 3px 0 rgba(45, 35, 30, 0.05)',
        '3d-hover': '0 30px 60px -20px rgba(45, 35, 30, 0.15), 0 10px 25px -5px rgba(200, 109, 81, 0.12)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'subtle-pulse': 'subtle-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      screens: { xs: '475px' },
    },
  },
  plugins: [],
}
