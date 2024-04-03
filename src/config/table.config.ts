import { TableOptions, getCoreRowModel } from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DEFAULT_TABLE_CONFIG: TableOptions<any> = {
  columns: [],
  data: [],
  getCoreRowModel: getCoreRowModel(),
};
