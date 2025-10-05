// All vscode variables https://gist.github.com/estruyf/ba49203e1a7d6868e9320a4ea480c27a
// Examples for vscode https://github.com/githubocto/tailwind-vscode/blob/main/index.js

// Default theme: Alsania futuristic/cyberpunk palette
// Primary highlight: Neon Green #39FF14
// Backgrounds: Midnight/Navy #0A2472 / #001F3F
export const THEME_COLORS = {
  background: {
    vars: [
      "--vscode-sideBar-background",
      "--vscode-editor-background",
      "--vscode-panel-background",
    ],
    default: "#001F3F", // Alsania midnight navy
  },
  foreground: {
    vars: [
      "--vscode-sideBar-foreground",
      "--vscode-editor-foreground",
      "--vscode-panel-foreground",
    ],
    default: "#E6E6E6", // light neutral for readability
  },
  "editor-background": {
    vars: ["--vscode-editor-background"],
    default: "#0A1E4F", // deep midnight blue
  },
  "editor-foreground": {
    vars: ["--vscode-editor-foreground"],
    default: "#E6E6E6", // light gray
  },
  "primary-background": {
    vars: ["--vscode-button-background"],
    default: "#39FF14", // neon green
  },
  "primary-foreground": {
    vars: ["--vscode-button-foreground"],
    default: "#001F3F", // dark navy for contrast on neon
  },
  "primary-hover": {
    vars: ["--vscode-button-hoverBackground"],
    default: "#58FF39", // brighter neon on hover
  },
  "secondary-background": {
    vars: ["--vscode-button-secondaryBackground"],
    default: "#0E2A66", // muted navy for secondary controls
  },
  "secondary-foreground": {
    vars: ["--vscode-button-secondaryForeground"],
    default: "#E6E6E6", // light gray
  },
  "secondary-hover": {
    vars: ["--vscode-button-secondaryHoverBackground"],
    default: "#1739A0", // brighter blue on hover
  },
  border: {
    vars: ["--vscode-sideBar-border", "--vscode-panel-border"],
    default: "#13315C", // cool dark border
  },
  "border-focus": {
    vars: ["--vscode-focusBorder"],
    default: "#39FF14", // neon green focus
  },
  // Command styles are used for tip-tap editor
  "command-background": {
    vars: ["--vscode-commandCenter-background"],
    default: "#0C214F",
  },
  "command-foreground": {
    vars: ["--vscode-commandCenter-foreground"],
    default: "#E6E6E6",
  },
  "command-border": {
    vars: ["--vscode-commandCenter-inactiveBorder"],
    default: "#26406D",
  },
  "command-border-focus": {
    vars: ["--vscode-commandCenter-activeBorder"],
    default: "#39FF14", // neon focus
  },
  description: {
    vars: ["--vscode-descriptionForeground"],
    default: "#93A4C6", // cool muted text
  },
  "description-muted": {
    vars: ["--vscode-list-deemphasizedForeground"],
    default: "#6B7A99", // dimmer muted text
  },
  "input-background": {
    vars: ["--vscode-input-background"],
    default: "#0D1B3A", // dark glassy input
  },
  "input-foreground": {
    vars: ["--vscode-input-foreground"],
    default: "#E6F1FF",
  },
  "input-border": {
    vars: [
      "--vscode-input-border",
      "--vscode-commandCenter-inactiveBorder",
      "vscode-border",
    ],
    default: "#26406D",
  },
  "input-placeholder": {
    vars: ["--vscode-input-placeholderForeground"],
    default: "#6B7A99",
  },
  "table-oddRow": {
    vars: ["--vscode-tree-tableOddRowsBackground"],
    default: "#0E234A",
  },
  "badge-background": {
    vars: ["--vscode-badge-background"],
    default: "#123457",
  },
  "badge-foreground": {
    vars: ["--vscode-badge-foreground"],
    default: "#E6E6E6",
  },
  success: {
    vars: [
      "--vscode-notebookStatusSuccessIcon-foreground",
      "--vscode-testing-iconPassed",
      "--vscode-gitDecoration-addedResourceForeground",
      "--vscode-charts-green",
    ],
    default: "#39FF14",
  },
  warning: {
    vars: [
      "--vscode-editorWarning-foreground",
      "--vscode-list-warningForeground",
    ],
    default: "#FFC857",
  },
  error: {
    vars: ["--vscode-editorError-foreground", "--vscode-list-errorForeground"],
    default: "#FF3864",
  },
  link: {
    vars: ["--vscode-textLink-foreground"],
    default: "#39FF14", // neon links
  },
  textCodeBlockBackground: {
    vars: ["--vscode-textCodeBlock-background"],
    default: "#0A1E4F",
  },
  accent: {
    vars: ["--vscode-tab-activeBorderTop", "--vscode-focusBorder"],
    default: "#39FF14",
  },
  "find-match": {
    vars: ["--vscode-editor-findMatchBackground"],
    default: "#39FF1440", // translucent neon
  },
  "find-match-selected": {
    vars: ["--vscode-editor-findMatchHighlightBackground"],
    default: "#58FF3940", // translucent brighter neon
  },
  "list-hover": {
    vars: ["--vscode-list-hoverBackground"],
    default: "#102B6F",
  },
  "list-active": {
    vars: ["--vscode-list-activeSelectionBackground"],
    default: "#0A2472",
  },
  "list-active-foreground": {
    vars: ["--vscode-list-activeSelectionForeground"],
    default: "#E6E6E6",
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
