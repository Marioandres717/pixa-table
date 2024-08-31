import { OnChangeFn, Row, Table } from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RowData = any;

export type SelectionAction = {
  type: string;
  onAction: (Row: Row<RowData>[], table: Table<RowData>) => void;
  isHidden?: boolean | ((Row: Row<RowData>[]) => boolean);
};

export interface SelectionActionsTableState {
  selectionActions: SelectionAction[];
}

export interface SelectionActionOptions {
  enableSelectionActions: boolean;
  onSelectionActionsChange?: OnChangeFn<SelectionAction[]>;
}

export interface SelectionActionsInstance {
  setSelectionActions: (actions: SelectionAction[]) => void;
  getSelectionActions: () => SelectionAction[];
  onSelectionAction: (action: SelectionAction, data: Row<RowData>[]) => void;
}
