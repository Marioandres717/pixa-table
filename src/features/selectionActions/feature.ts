import { RowData, TableFeature } from "@tanstack/react-table";

export const SelectionActionsFeature: TableFeature<RowData> = {
  getDefaultOptions() {
    return {
      enableSelectionActions: false,
      selectionActions: [],
    };
  },

  createTable(table) {
    table.getSelectionActions = () =>
      table.options.enableSelectionActions
        ? table.options.selectionActions
        : [];
  },
};
