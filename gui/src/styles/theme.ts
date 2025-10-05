// All vscode variables https://gist.github.com/estruyf/ba49203e1a7d6868e9320a4ea480c27a
// Examples for vscode https://github.com/githubocto/tailwind-vscode/blob/main/index.js

// The current default theme is dark with blue accents
export const THEME_COLORS = {
  background: {
    vars: [
      "--vscode-sideBar-background",
      "--vscode-editor-background",
      "--vscode-panel-background",
    ],
    default: "rgba(10, 36, 114, 0.8)", // cyberpunk midnight with transparency
  },
  foreground: {
    vars: [
      "--vscode-sideBar-foreground",
      "--vscode-editor-foreground",
      "--vscode-panel-foreground",
    ],
    default: "#39FF14", // cyberpunk neon green
  },
  "editor-background": {
    vars: ["--vscode-editor-background"],
    default: "rgba(0, 31, 63, 0.9)", // cyberpunk navy with transparency
  },
  "editor-foreground": {
    vars: ["--vscode-editor-foreground"],
    default: "#39FF14", // cyberpunk neon green
  },
  "primary-background": {
    vars: ["--vscode-button-background"],
    default: "rgba(57, 255, 20, 0.2)", // cyberpunk neon green with transparency
  },
  "primary-foreground": {
    vars: ["--vscode-button-foreground"],
    default: "#000000", // black for contrast
  },
  "primary-hover": {
    vars: ["--vscode-button-hoverBackground"],
    default: "#2ECC40", // darker neon green
  },
  "secondary-background": {
    vars: ["--vscode-button-secondaryBackground"],
    default: "rgba(0, 31, 63, 0.3)", // cyberpunk navy with transparency
  },
  "secondary-foreground": {
    vars: ["--vscode-button-secondaryForeground"],
    default: "#39FF14", // cyberpunk neon green
  },
  "secondary-hover": {
    vars: ["--vscode-button-secondaryHoverBackground"],
    default: "#0A2472", // cyberpunk midnight
  },
  border: {
    vars: ["--vscode-sideBar-border", "--vscode-panel-border"],
    default: "#39FF14", // cyberpunk neon green border
  },
  "border-focus": {
    vars: ["--vscode-focusBorder"],
    default: "#39FF14", // cyberpunk neon green focus
  },
  // Command styles are used for tip-tap editor
  "command-background": {
    vars: ["--vscode-commandCenter-background"],
    default: "rgba(0, 31, 63, 0.4)", // cyberpunk navy with transparency
  },
  "command-foreground": {
    vars: ["--vscode-commandCenter-foreground"],
    default: "#39FF14", // cyberpunk neon green
  },
  "command-border": {
    vars: ["--vscode-commandCenter-inactiveBorder"],
    default: "#0A2472", // cyberpunk midnight
  },
  "command-border-focus": {
    vars: ["--vscode-commandCenter-activeBorder"],
    default: "#39FF14", // cyberpunk neon green
  },
  description: {
    vars: ["--vscode-descriptionForeground"],
    default: "#39FF14", // cyberpunk neon green
  },
  "description-muted": {
    vars: ["--vscode-list-deemphasizedForeground"],
    default: "#2ECC40", // darker neon green
  },
  "input-background": {
    vars: ["--vscode-input-background"],
    default: "rgba(0, 31, 63, 0.3)", // cyberpunk navy with transparency
  },
  "input-foreground": {
    vars: ["--vscode-input-foreground"],
    default: "#39FF14", // cyberpunk neon green
  },
  "input-border": {
    vars: [
      "--vscode-input-border",
      "--vscode-commandCenter-inactiveBorder",
      "vscode-border",
    ],
    default: "#39FF14", // cyberpunk neon green
  },
  "input-placeholder": {
    vars: ["--vscode-input-placeholderForeground"],
    default: "#2ECC40", // darker neon green
  },
  "table-oddRow": {
    vars: ["--vscode-tree-tableOddRowsBackground"],
    default: "#2d2d2d", // dark gray
  },
  "badge-background": {
    vars: ["--vscode-badge-background"],
    default: "#4d4d4d", // medium dark gray
  },
  "badge-foreground": {
    vars: ["--vscode-badge-foreground"],
    default: "#ffffff", // white
  },
  success: {
    vars: [
      "--vscode-notebookStatusSuccessIcon-foreground",
      "--vscode-testing-iconPassed",
      "--vscode-gitDecoration-addedResourceForeground",
      "--vscode-charts-green",
    ],
    default: "#4caf50", // green
  },
  warning: {
    vars: [
      "--vscode-editorWarning-foreground",
      "--vscode-list-warningForeground",
    ],
    default: "#ffb74d", // amber/yellow
  },
  error: {
    vars: ["--vscode-editorError-foreground", "--vscode-list-errorForeground"],
    default: "#f44336", // red
  },
  link: {
    vars: ["--vscode-textLink-foreground"],
    default: "#5c9ce6", // medium blue
  },
  textCodeBlockBackground: {
    vars: ["--vscode-textCodeBlock-background"],
    default: "#1e1e1e", // same as editor-background
  },
  accent: {
    vars: ["--vscode-tab-activeBorderTop", "--vscode-focusBorder"],
    default: "#4d8bf0", // bright blue
  },
  "find-match": {
    vars: ["--vscode-editor-findMatchBackground"], // Can't get "var(--vscode-editor-findMatchBackground, rgba(237, 18, 146, 0.5))" to work
    default: "#264f7840", // translucent blue
  },
  "find-match-selected": {
    vars: ["--vscode-editor-findMatchHighlightBackground"],
    default: "#ffb74d40", // translucent amber
  },
  "list-hover": {
    // --vscode-tab-hoverBackground
    vars: ["--vscode-list-hoverBackground"],
    default: "#383838", // medium dark gray
  },
  "list-active": {
    vars: ["--vscode-list-activeSelectionBackground"],
    default: "#2c5aa050", // translucent medium blue
  },
  "list-active-foreground": {
    vars: ["--vscode-list-activeSelectionForeground"],
    default: "#ffffff", // white
  },
};

// TODO: add fonts - GUI fonts in jetbrains differ from IDE:
// --vscode-editor-font-family;
// --vscode-font-family;
export const THEME_CSS_VARS = Object.values(THEME_COLORS)
  .map((value) => value.vars)
  .flat();

export const THEME_CSS_VAR_DEFAULTS = Object.entries(THEME_COLORS).reduce(
  (acc, [_, value]) => {
    value.vars.forEach((varName) => {
      acc[varName] = value.default;
    });
    return acc;
  },
  {} as Record<string, string>,
);

export const THEME_DEFAULTS = Object.entries(THEME_COLORS).reduce(
  (acc, [key, value]) => {
    acc[key] = value.default;
    return acc;
  },
  {} as Record<string, string>,
);

// Generates recursive CSS variable fallback for a given color name
// e.g. var(--vscode-button-background, var(--vscode-button-foreground, #ffffff))
export const getRecursiveVar = (vars: string[], defaultColor: string) => {
  return [...vars].reverse().reduce((curr, varName) => {
    return `var(${varName}, ${curr})`;
  }, defaultColor);
};

export const varWithFallback = (colorName: keyof typeof THEME_COLORS) => {
  const themeVals = THEME_COLORS[colorName];
  if (!themeVals) {
    throw new Error(`Invalid theme color name ${colorName}`);
  }
  return getRecursiveVar(themeVals.vars, themeVals.default);
};

export const setDocumentStylesFromTheme = (
  theme: Record<string, string | undefined | null>,
) => {
  // Check for extraneous theme items
  Object.entries(theme).forEach(([colorName, value]) => {
    const themeVals = THEME_COLORS[colorName as keyof typeof THEME_COLORS];
    if (!themeVals) {
      console.warn(
        `Receieved theme color ${colorName} which is not used by the theme`,
      );
      return;
    }
  });

  // Write theme values to document
  const missingColors: string[] = [];
  Object.entries(THEME_COLORS).forEach(([colorName, settings]) => {
    let colorVal = settings.default;
    const newColor = theme[colorName];
    if (newColor) {
      colorVal = newColor;
      // Remove alpha channel from all hex colors (seems to cause bad colors)
      if (newColor.startsWith("#") && newColor.length > 7) {
        colorVal = colorVal.slice(0, 7);
      }
    } else {
      missingColors.push(colorName);
      // console.warn(
      //   `Missing theme color: ${colorName}. Falling back to default ${colorVal}`,
      // );
    }

    localStorage.setItem(colorName, colorVal);
    for (const cssVar of settings.vars) {
      document.body.style.setProperty(cssVar, colorVal);
      document.documentElement.style.setProperty(cssVar, colorVal);
    }
  });

  return missingColors;
};

export const setDocumentStylesFromLocalStorage = (checkCache: boolean) => {
  for (const [colorName, themeVals] of Object.entries(THEME_COLORS)) {
    for (const cssVar of themeVals.vars) {
      // Get cached values (for non-vscode IDEs)
      if (checkCache) {
        const cached = localStorage.getItem(colorName);
        if (cached) {
          document.body.style.setProperty(cssVar, cached);
        }
      }
    }
  }
};

export const clearThemeLocalCache = () => {
  for (const colorName of Object.keys(THEME_COLORS)) {
    localStorage.removeItem(colorName);
  }
};
