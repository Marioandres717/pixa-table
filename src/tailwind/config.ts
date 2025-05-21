import type { Config } from "tailwindcss";
import { fontFamily, borderWidth } from "tailwindcss/defaultTheme";
import { baseTheme as themeBase } from "../styles/themes/base";
import { darkTheme, lightTheme } from "../styles/themes";
import { plugins } from "./plugins";

export const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    fontFamily: {
      sans: ["Hind", ...fontFamily.sans],
      serif: fontFamily.serif,
      mono: fontFamily.mono,
    },
    colors: {
      ...themeBase,
      dark: darkTheme,
      light: lightTheme,
    },
    spacing: {
      px: "1px",
      "0": "0px",
      "0.5": "2px",
      "1": "4px",
      "1.5": "6px",
      "2": "8px",
      "2.5": "10px",
      "3": "12px",
      "3.5": "14px",
      "4": "16px",
      "5": "20px",
      "6": "24px",
      "7": "28px",
      "8": "32px",
      "9": "36px",
      "10": "40px",
      "11": "44px",
      "12": "48px",
      "14": "56px",
      "16": "64px",
      "20": "80px",
      "24": "96px",
      "28": "112px",
      "32": "128px",
      "36": "144px",
      "40": "160px",
      "44": "176px",
      "48": "192px",
      "52": "208px",
      "56": "224px",
      "60": "240px",
      "64": "256px",
      "72": "288px",
      "80": "320px",
      "96": "384px",
    },
    extend: {
      fontSize: {
        "col-heading": ["11px", "normal"],
        base: ["13px", "normal"],
      },
      scrollbar: {
        width: "8px",
        track: "transparent",
        thumb: "#f3f4f4",
        thumbHover: "#a3a3a3",
        corner: "transparent",
        border: "1px solid #cfd2d4",
        borderRadius: "4px",
        dark: {
          track: "transparent",
          thumb: "#1a2832",
          thumbHover: "#a3a3a3",
          corner: "transparent",
          border: "1px solid #1a2832",
        },
      },
      borderWidth: {
        ...borderWidth,
        ...{
          thin: "thin",
          medium: "medium",
          thick: "thick",
          row: "var(--border-width)",
        },
      },
    },
  },
  plugins: plugins,
};
