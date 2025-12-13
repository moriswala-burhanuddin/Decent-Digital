/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {

      colors: {

        // Design System Colors
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          light: '#60a5fa',
          dark: '#1d4ed8',
          foreground: '#ffffff'
        },
        secondary: {
          DEFAULT: '#06b6d4',
          hover: '#0891b2',
          light: '#22d3ee',
          foreground: '#ffffff'
        },

        // Base UI Colors
        dark: {
          DEFAULT: '#0f172a',
          lighter: '#1e293b',
          card: 'rgba(30, 41, 59, 0.7)'
        },
        light: {
          DEFAULT: '#f8fafc',
          card: 'rgba(255, 255, 255, 0.7)'
        },

        // Accent Colors
        accent: {
          DEFAULT: '#22d3ee',
          purple: '#8b5cf6',
          pink: '#ec4899'
        },

        // CSS Variable Support
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          glass: "hsl(var(--card-glass))",
          foreground: "hsl(var(--card-foreground))"
        },

        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },


      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        myfont: ["ZenterSPD", "sans-serif"],
        body: ["Astonpoliz", "sans-serif"],

      },



      animation: {
        blob: 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }

    }
  },

  plugins: [],
};
