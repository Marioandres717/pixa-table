import type { PluginCreator } from "tailwindcss/types/config";

export const semanticShortcuts: PluginCreator = ({ addUtilities }) => {
  const shortcuts = {
    /* ======================
     SURFACE SHORTCUTS (Fixed)
     ====================== */
    ".bg-surface": {
      "background-color": "var(--surface-base)",
    },
    ".bg-surface-elevated": {
      "background-color": "var(--surface-elevated)",
    },
    ".bg-surface-overlay": {
      "background-color": "var(--surface-overlay)",
    },
    ".bg-surface-inverted": {
      "background-color": "var(--surface-inverted)",
    },

    /* ======================
     TEXT SHORTCUTS (Fixed)
     ====================== */
    ".text": {
      color: "var(--text-primary)",
      fontSize: "var(--font-size)",
      fontFamily: "var(--font-sans)",
    },
    ".text-secondary": {
      color: "var(--text-secondary)",
    },
    ".text-inverted": {
      color: "var(--text-inverted)",
    },

    /* ======================
     BORDER SHORTCUTS (Optimized)
     ====================== */
    ".b": {
      "border-width": "var(--border-width)",
      "border-style": "solid",
      "border-color": "var(--border-primary)",
    },
    ".b-subtle": {
      "border-width": "var(--border-width)",
      "border-style": "solid",
      "border-color": "var(--border-subtle)",
    },
    ".b-strong": {
      "border-width": "var(--border-width)",
      "border-style": "solid",
      "border-color": "var(--border-strong)",
    },
    ".b-x": {
      "border-left-width": "var(--border-width)",
      "border-right-width": "var(--border-width)",
      "border-style": "solid",
      "border-color": "var(--border-primary)",
    },
    ".b-y": {
      "border-top-width": "var(--border-width)",
      "border-bottom-width": "var(--border-width)",
      "border-style": "solid",
      "border-color": "var(--border-primary)",
    },
    ".b-t": {
      "border-top-width": "var(--border-width)",
      "border-style": "solid",
      "border-color": "var(--border-primary)",
    },
    ".b-b": {
      "border-bottom-width": "var(--border-width)",
      "border-style": "solid",
      "border-color": "var(--border-primary)",
    },
    ".b-l": {
      "border-left-width": "var(--border-width)",
      "border-style": "solid",
      "border-color": "var(--border-primary)",
    },
    ".b-r": {
      "border-right-width": "var(--border-width)",
      "border-style": "solid",
      "border-color": "var(--border-primary)",
    },

    /* ======================
     INTERACTION SHORTCUTS (Safe)
     ====================== */
    ".hover-bg": {
      "&:hover": {
        "background-color": "var(--interaction-hover)",
      },
    },
    ".active-bg": {
      '&[data-active="true"]': {
        "background-color": "var(--interaction-active)",
      },
      '&[data-active="true"]:hover': {
        "background-color": "var(--interaction-active) !important",
      },
    },
  };

  addUtilities(shortcuts, {
    // Ensure these utilities can override others when needed
    respectPrefix: true,
    respectImportant: false,
  });
};
