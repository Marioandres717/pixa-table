import { Row, Table } from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RowData = any;

export type SelectionAction = {
  name: string;
  onAction: (Row: Row<RowData>[], table: Table<RowData>) => void;
  isHidden?: boolean | ((Row: Row<RowData>[]) => boolean);
};

export interface SelectionActionOptions {
  enableSelectionActions: boolean;
  selectionActions: SelectionAction[];
}

export interface SelectionActionsInstance {
  getSelectionActions: () => SelectionAction[];
}
