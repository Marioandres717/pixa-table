import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  TableOptions,
  RowData,
} from "@tanstack/react-table";
import { RowActionsFeature, SelectionActionsFeature } from "../features";
import { ThemeFeature } from "../features/theme/feature";

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
    _features: [SelectionActionsFeature, RowActionsFeature, ThemeFeature],
  } as TableOptions<TData>);
}
