/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import { theme } from "./src/theme";
import talwindcssForms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    fontFamily: {
      sans: ["Hind", ...fontFamily.sans],
      serif: fontFamily.serif,
      mono: fontFamily.mono,
    },
    colors: theme.colors,
    spacing: theme.spacing,
    extend: {
      fontSize: theme.fontSize,
      scrollbar: theme.scrollbar,
    },
  },
  plugins: [
    talwindcssForms,
    function ({ addUtilities, theme }) {
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

        // Dark Mode Styles (Chromium-based browsers)
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
            "scrollbar-width": "thin", // Controls scrollbar width (thin, auto, none)
            "scrollbar-color": `${theme("scrollbar.thumb")} ${theme(
              "scrollbar.track",
            )}`, // Thumb and track colors
          },
          ":is([data-theme='dark'] *) .scrollbar": {
            "scrollbar-color": `${theme("scrollbar.dark.thumb")} ${theme(
              "scrollbar.dark.track",
            )}`,
          },
        },
      };

      addUtilities(scrollbarStyles);
    },
  ],
};
