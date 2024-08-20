import {
  functionalUpdate,
  makeStateUpdater,
  RowData,
  TableFeature,
  Updater,
} from "@tanstack/react-table";
import { SelectionAction } from "./types";

export const SelectionActionsFeature: TableFeature<RowData> = {
  getDefaultOptions(table) {
    return {
      enableSelectionActions: table.options?.enableRowSelection ? true : false,
      onSelectionActionsChange: makeStateUpdater("selectionActions", table),
    };
  },

  createTable(table) {
    table.getSelectionActions = () => table.getState().selectionActions || [];

    table.setSelectionActions = (updater) => {
      const safeUpdater: Updater<SelectionAction[]> = (old) => {
        const newState = functionalUpdate(updater, old);
        return newState;
      };
      return table.options.onSelectionActionsChange?.(safeUpdater);
    };

    table.onSelectionAction = (action, data) => {
      action.onAction(data, table);
    };
  },
};
