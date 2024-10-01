import { Table } from "@tanstack/react-table";
import clsx from "clsx";
import { HeaderRow } from "./headerRow";

type Props<TData> = {
  table: Table<TData>;
  className?: string;
};

export function TableHeader<TData>({ table, className }: Props<TData>) {
  const headerGroups = table.getHeaderGroups();

  return (
    <div
      data-testid="table-header"
      role="rowgroup"
      className={clsx("sticky top-0 z-10 h-8", className)}
    >
      {headerGroups.map((headerGroup) => (
        <HeaderRow
          key={headerGroup.id}
          table={table}
          headerGroup={headerGroup}
        />
      ))}
    </div>
  );
}
