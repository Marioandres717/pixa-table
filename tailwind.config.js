/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import { theme } from "./src/theme";
import talwindcssForms from "@tailwindcss/forms";

export default {
  important: true, // Add !important to all utilities
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    fontFamily: {
      sans: ["Hind", ...fontFamily.sans],
      serif: fontFamily.serif,
      mono: fontFamily.mono,
    },
    colors: theme.colors,
  },
  plugins: [talwindcssForms],
};
