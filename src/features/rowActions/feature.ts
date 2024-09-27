import { RowData, TableFeature } from "@tanstack/react-table";

export const RowActionsFeature: TableFeature<RowData> = {
  getDefaultOptions() {
    return {
      enableRowActions: false,
      rowActions: [],
    };
  },

  createTable(table) {
    table.getRowActions = () =>
      table.options.enableRowActions ? table.options.rowActions : [];

    table.onRowAction = (action, data) => {
      action.onAction(data);
    };
  },

  createRow(row, table) {
    row.getRowActions = () => table.getRowActions();
    row.onRowAction = (action) => table.onRowAction(action, row);
  },
};
