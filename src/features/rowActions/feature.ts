import {
  functionalUpdate,
  makeStateUpdater,
  RowData,
  TableFeature,
  Updater,
} from "@tanstack/react-table";
import { RowAction } from "./types";

export const RowActionsFeature: TableFeature<RowData> = {
  getDefaultOptions(table) {
    return {
      enableRowActions: true,
      onRowActionsChange: makeStateUpdater("rowActions", table),
    };
  },

  createTable(table) {
    table.getRowActions = () => table.getState().rowActions;

    table.setRowActions = (updater) => {
      const safeUpdater: Updater<RowAction[]> = (old) => {
        const newState = functionalUpdate(updater, old);
        return newState;
      };
      return table.options.onRowActionsChange?.(safeUpdater);
    };

    table.onRowAction = (action, data) => {
      action.onAction(data);
    };
  },

  createRow(row, table) {
    row.getRowActions = () => table.getRowActions();
    row.onRowAction = (action) => table.onRowAction(action, row);
  },
};
