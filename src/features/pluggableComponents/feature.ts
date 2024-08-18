import { RowData, TableFeature } from "@tanstack/react-table";

export const PluggableComponentsFeature: TableFeature<RowData> = {
  createTable(table) {
    table.getPluggableComponents = () =>
      table.options.pluggableComponents || {};
  },
};
