// Enhanced Design System for Modern Blog Redesign
// This file contains all design tokens, colors, typography, and component styles

export const designSystem = {
  // Enhanced Color Palette
  colors: {
    // Primary gradients (your signature blue-purple)
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764'
    },
    
    // New accent colors for variety
    accent: {
      emerald: {
        50: '#ecfdf5',
        500: '#10b981',
        600: '#059669',
        700: '#047857'
      },
      amber: {
        50: '#fffbeb',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309'
      },
      rose: {
        50: '#fff1f2',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c'
      },
      indigo: {
        50: '#eef2ff',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca'
      }
    },
    
    // Enhanced neutral palette
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    },
    
    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },

  // Enhanced Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      display: ['Inter', 'system-ui', 'sans-serif']
    },
    fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }]
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    }
  },

  // Spacing Scale
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },

  // Border Radius Scale
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },

  // Shadow Scale
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000'
  },

  // Animation Durations
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms'
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

// Component Style Presets
export const componentStyles = {
  // Modern Card Styles
  card: {
    base: "group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500",
    hover: "hover:scale-[1.02] hover:shadow-2xl transition-all duration-300",
    featured: "ring-2 ring-blue-500/20 dark:ring-blue-400/20 shadow-2xl"
  },

  // Button Styles
  button: {
    primary: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95",
    secondary: "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95",
    ghost: "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium px-4 py-2 rounded-lg transition-all duration-200"
  },

  // Typography Styles
  text: {
    display: "text-5xl md:text-6xl font-bold leading-tight",
    h1: "text-4xl md:text-5xl font-bold leading-tight",
    h2: "text-3xl md:text-4xl font-semibold leading-tight",
    h3: "text-2xl md:text-3xl font-semibold leading-tight",
    h4: "text-xl md:text-2xl font-medium leading-tight",
    body: "text-base md:text-lg leading-relaxed",
    caption: "text-sm text-slate-600 dark:text-slate-400",
    code: "text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded"
  },

  // Gradient Text Styles
  gradientText: {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
    secondary: "bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent",
    accent: "bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent"
  },

  // Glass Morphism Effects
  glass: {
    light: "bg-white/80 backdrop-blur-md border border-white/20",
    dark: "bg-slate-900/80 backdrop-blur-md border border-slate-700/50",
    card: "bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50"
  },

  // Animation Classes
  animations: {
    fadeIn: "animate-fade-in",
    slideIn: "animate-slide-in",
    scaleIn: "animate-scale-in",
    bounce: "animate-bounce",
    pulse: "animate-pulse",
    spin: "animate-spin"
  }
};

// Utility Functions
export const getGradientClass = (from: string, to: string) => 
  `bg-gradient-to-r from-${from} to-${to}`;

export const getShadowClass = (size: keyof typeof designSystem.shadows) => 
  `shadow-${size}`;

export const getSpacingClass = (size: keyof typeof designSystem.spacing) => 
  `p-${size}`;

export const getBorderRadiusClass = (size: keyof typeof designSystem.borderRadius) => 
  `rounded-${size}`;

// Responsive Helper
export const responsive = {
  mobile: 'sm:',
  tablet: 'md:',
  desktop: 'lg:',
  wide: 'xl:',
  ultra: '2xl:'
};

export default designSystem;
