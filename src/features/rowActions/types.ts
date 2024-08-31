import { OnChangeFn, Row } from "@tanstack/react-table";

// eslint-disable-next-line
type RowData = any;

export type RowAction = {
  type: string;
  onAction: (row: Row<RowData>) => void;
  Component?: React.ComponentType<{
    row: Row<RowData>;
    onClick: (row: Row<RowData>) => void;
  }>;
  isHidden?: boolean | ((Row: Row<RowData>) => boolean);
};

export interface RowActionsTableState {
  rowActions: RowAction[];
}

export interface RowActionOptions {
  enableRowActions: boolean;
  onRowActionsChange?: OnChangeFn<RowAction[]>;
}

export interface RowActionsInstance {
  setRowActions: (actions: RowAction[]) => void;
  getRowActions: () => RowAction[];
  onRowAction: (action: RowAction, data: Row<RowData>) => void;
}

export interface TableRowActionsInstance {
  getRowActions: () => RowAction[];
  onRowAction: (action: RowAction) => void;
}
