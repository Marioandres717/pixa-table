/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import { theme } from "./theme";
import talwindcssForms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.html"],
  theme: {
    fontFamily: {
      sans: ["Hind", ...fontFamily.sans],
      serif: fontFamily.serif,
      mono: fontFamily.mono,
    },
    extend: {
      colors: theme.colors,
    },
  },
  plugins: [talwindcssForms],
};
