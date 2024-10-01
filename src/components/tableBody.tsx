import { Table } from "@tanstack/react-table";
import { DataRow } from "./row";

type Props<TData> = {
  table: Table<TData>;
};

export function TableBody<TData>({ table }: Props<TData>) {
  const rows = table.getRowModel().rows;

  return (
    <div data-testid="table-body" role="rowgroup">
      {rows.map((row) => (
        <DataRow key={row.id} row={row} table={table} />
      ))}
    </div>
  );
}
