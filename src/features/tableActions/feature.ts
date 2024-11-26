import { RowData, TableFeature } from "@tanstack/react-table";

export const TableActionsFeature: TableFeature<RowData> = {
  getDefaultOptions() {
    return {
      enableTableActions: false,
      tableActions: [],
    };
  },

  createTable(table) {
    table.getTableActions = () =>
      table.options.enableTableActions ? table.options.tableActions : [];
  },
};
