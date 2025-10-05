/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const { varWithFallback, THEME_COLORS } = require("./src/styles/theme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Note that these breakpoints are primarily optimized for the input toolbar
    screens: {
      "2xs": "170px", // Smallest width for Primary Sidebar in VS Code
      xs: "250px", // Avg default sidebar width in VS Code
      sm: "330px",
      int: "380px",
      md: "460px",
      lg: "590px",
      xl: "720px",
      "2xl": "860px",
      "3xl": "1000px",
      "4xl": "1180px",
    },
    extend: {
      animation: {
        "spin-slow": "spin 6s linear infinite",
        "cyberpunk-pulse": "cyberpunk-pulse 2s ease-in-out infinite",
        "cyberpunk-scan": "cyberpunk-scan 3s linear infinite",
        "glass-shimmer": "glass-shimmer 2s ease-in-out infinite",
        "glass-pulse": "glass-pulse 3s ease-in-out infinite",
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'cyberpunk-headline': ['Orbitron', 'Courier New', 'monospace'],
        'cyberpunk-dashboard': ['Rajdhani', 'Arial', 'sans-serif'],
        'cyberpunk-body': ['Open Sans', 'Arial', 'sans-serif'],
      },
      backdropBlur: {
        'cyberpunk': '10px',
        'cyberpunk-strong': '20px',
      },
      borderRadius: {
        default: "0.5rem",
      },
      fontSize: {
        "2xs": "0.6875rem", // 11px
      },
      outlineOffset: {
        0.5: "0.5px",
      },
      colors: {
        background: varWithFallback("background"),
        foreground: varWithFallback("foreground"),
        editor: {
          DEFAULT: varWithFallback("editor-background"),
          foreground: varWithFallback("editor-foreground"),
        },
        primary: {
          DEFAULT: varWithFallback("primary-background"),
          foreground: varWithFallback("primary-foreground"),
          hover: varWithFallback("primary-hover"),
        },
        secondary: {
          DEFAULT: varWithFallback("secondary-background"),
          foreground: varWithFallback("secondary-foreground"),
          hover: varWithFallback("secondary-hover"),
        },
        border: {
          DEFAULT: varWithFallback("border"),
          focus: varWithFallback("border-focus"),
        },
        command: {
          DEFAULT: varWithFallback("command-background"),
          foreground: varWithFallback("command-foreground"),
          border: {
            DEFAULT: varWithFallback("command-border"),
            focus: varWithFallback("command-border-focus"),
          },
        },
        description: {
          DEFAULT: varWithFallback("description"),
          muted: varWithFallback("description-muted"),
        },
        input: {
          DEFAULT: varWithFallback("input-background"),
          foreground: varWithFallback("input-foreground"),
          border: varWithFallback("input-border"),
          placeholder: varWithFallback("input-placeholder"),
        },
        table: {
          oddRow: varWithFallback("table-oddRow"),
        },
        badge: {
          DEFAULT: varWithFallback("badge-background"),
          foreground: varWithFallback("badge-foreground"),
        },
        success: varWithFallback("success"),
        warning: varWithFallback("warning"),
        error: varWithFallback("error"),
        link: varWithFallback("link"),
        accent: varWithFallback("accent"),
        findMatch: {
          DEFAULT: THEME_COLORS["find-match"].default,
          selected: varWithFallback("find-match-selected"),
        },
        list: {
          hover: varWithFallback("list-hover"),
          active: {
            DEFAULT: varWithFallback("list-active"),
            foreground: varWithFallback("list-active-foreground"),
          },
        },

        // Cyberpunk Brand Colors
        "cyberpunk-neon": "#39FF14",
        "cyberpunk-midnight": "#0A2472",
        "cyberpunk-navy": "#001F3F",
        "cyberpunk-black": "#000000",
        "cyberpunk-white": "#FFFFFF",
        
        // Glass Morphism Colors
        "glass-primary": "rgba(10, 36, 114, 0.15)",
        "glass-secondary": "rgba(0, 31, 63, 0.2)",
        "glass-accent": "rgba(57, 255, 20, 0.1)",
        "glass-border": "rgba(57, 255, 20, 0.3)",
        "glass-border-strong": "rgba(57, 255, 20, 0.6)",

        // DEPRECATED, slowly remove usages of these ide-named or explicit colors
        lightgray: "#999998", // use border, description, or description-muted instead - AVOID
        "vsc-input-background": varWithFallback("input-background"), // use "input-background" instead
        "vsc-background": varWithFallback("background"), // use "background" instead
        "vsc-foreground": varWithFallback("editor-foreground"), // use "foreground" instead
        "vsc-editor-background": varWithFallback("editor-background"), // use "editor" instead
        "vsc-input-border": varWithFallback("input-border"), // use "input-border" instead
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
