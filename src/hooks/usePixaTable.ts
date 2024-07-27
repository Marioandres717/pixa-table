import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  TableOptions,
  RowData,
} from "@tanstack/react-table";

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
  } as TableOptions<TData>);
}
