import { OnChangeFn } from "@tanstack/react-table";

export type Theme = "dark" | "light";

export interface ThemeState {
  theme: Theme;
}

export interface ThemeOptions {
  theme: Theme;
  onThemeChange?: OnChangeFn<Theme>;
}

export interface ThemeInstance {
  getTheme: () => Theme;
  setTheme: (theme: Theme) => void;
  onThemeChange: (theme: Theme) => void;
}
