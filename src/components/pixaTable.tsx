import { Table } from "@tanstack/react-table";
import { TableSkeleton } from "./tableSkeleton";
import { TableLayout } from "./tableLayout";

type Props<TData> = {
  table: Table<TData>;
};

export function PixaTable<TData>({ table }: Props<TData>) {
  const theme = table.getTheme();
  const showTableSkeleton =
    table.getState().isLoading && table.options.showSkeleton;

  if (showTableSkeleton) {
    return <TableSkeleton theme={theme} />;
  }

  return (
    <div className="pxt" style={{ display: "contents" }} data-theme={theme}>
      <TableLayout table={table} />
    </div>
  );
}
