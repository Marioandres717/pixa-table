import { RowData, TableFeature } from "@tanstack/react-table";

export const RowActionsFeature: TableFeature<RowData> = {
  getDefaultOptions() {
    return {
      enableRowActions: false,
      rowActions: [],
    };
  },

  createRow(row, table) {
    row.getRowActions = () =>
      table.options.enableRowActions ? table.options.rowActions : [];
  },
};
