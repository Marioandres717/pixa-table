import {
  functionalUpdate,
  makeStateUpdater,
  RowData,
  TableFeature,
  Updater,
} from "@tanstack/react-table";
import { Theme } from "./types";

export const ThemeFeature: TableFeature<RowData> = {
  getDefaultOptions(table) {
    return {
      theme: "dark",
      onThemeChange: makeStateUpdater("theme", table),
    };
  },

  createTable(table) {
    table.getTheme = () => table.options.theme;
    table.setTheme = (updater) => {
      const safeUpdater: Updater<Theme> = (old) => {
        const newState = functionalUpdate(updater, old);
        return newState;
      };
      return table.options.onThemeChange?.(safeUpdater);
    };
  },
};
