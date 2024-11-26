import { Table } from "@tanstack/react-table";

export type TableAction<TData> = {
  name: string;
  onAction: (table: Table<TData>) => void;
  isHidden?: boolean;
};

export interface TableActionOptions<TData> {
  enableTableActions: boolean;
  tableActions: TableAction<TData>[];
}

export interface TableActionsInstance<TData> {
  getTableActions: () => TableAction<TData>[];
}
