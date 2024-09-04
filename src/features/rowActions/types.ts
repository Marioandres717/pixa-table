import { Row } from "@tanstack/react-table";

// eslint-disable-next-line
type RowData = any;

export type RowAction = {
  type: string;
  onAction: (row: Row<RowData>) => void;
  isHidden?: boolean | ((Row: Row<RowData>) => boolean);
  Component: React.ComponentType<{
    row: Row<RowData>;
    onClick: (row: Row<RowData>) => void;
  }>;
};

export interface RowActionOptions {
  enableRowActions: boolean;
  rowActions: RowAction[];
}

export interface RowActionsInstance {
  getRowActions: () => RowAction[];
  onRowAction: (action: RowAction, data: Row<RowData>) => void;
}

export interface TableRowActionsInstance {
  getRowActions: () => RowAction[];
  onRowAction: (action: RowAction) => void;
}
