import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  TableOptions,
  RowData,
} from "@tanstack/react-table";
import { SelectionActionsFeature } from "../features";

const DEFAULT_TABLE_CONFIG: Partial<TableOptions<RowData>> = {
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  columnResizeMode: "onChange",
};

export function usePixaTable<TData>(options: Partial<TableOptions<TData>>) {
  return useReactTable<TData>({
    ...DEFAULT_TABLE_CONFIG,
    ...options,
    _features: [SelectionActionsFeature],
  } as TableOptions<TData>);
}
