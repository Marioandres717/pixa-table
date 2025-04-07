/**
 * Custom scrollbar plugin for Tailwind CSS
 *
 * Features:
 * - Customizable scrollbar styles for WebKit browsers
 * - Dark mode support
 * - Firefox compatibility
 * - Configurable via theme.extend.scrollbar
 */
import type { PluginAPI } from "tailwindcss/types/config";

export const scrollbarPlugin = ({ addUtilities, theme }: PluginAPI) => {
  const scrollbarStyles = {
    // Default Scrollbar Styles (Chromium-based browsers)
    ".scrollbar": {
      "&::-webkit-scrollbar": {
        width: theme("scrollbar.width"),
        height: theme("scrollbar.width"),
      },
      "&::-webkit-scrollbar-track": {
        background: theme("scrollbar.track"),
        borderRadius: theme("scrollbar.borderRadius"),
      },
      "&::-webkit-scrollbar-thumb": {
        background: `${theme("scrollbar.thumb")} !important`,
        borderRadius: theme("scrollbar.borderRadius"),
        border: theme("scrollbar.border"),
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: theme("scrollbar.thumbHover"),
      },
      "&::-webkit-scrollbar-corner": {
        background: theme("scrollbar.corner"),
      },
    },

    // Dark Mode Styles
    ":is([data-theme='dark'] *) .scrollbar": {
      "&::-webkit-scrollbar-track": {
        background: theme("scrollbar.dark.track"),
      },
      "&::-webkit-scrollbar-thumb": {
        background: `${theme("scrollbar.dark.thumb")} !important`,
        border: theme("scrollbar.dark.border"),
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: theme("scrollbar.dark.thumbHover"),
      },
      "&::-webkit-scrollbar-corner": {
        background: theme("scrollbar.dark.corner"),
      },
    },

    // Firefox-Specific Styles
    "@-moz-document url-prefix()": {
      ".scrollbar": {
        "scrollbar-width": "thin",
        "scrollbar-color": `${theme("scrollbar.thumb")} ${theme("scrollbar.track")}`,
      },
      ":is([data-theme='dark'] *) .scrollbar": {
        "scrollbar-color": `${theme("scrollbar.dark.thumb")} ${theme("scrollbar.dark.track")}`,
      },
    },
  };

  addUtilities(scrollbarStyles);
};
