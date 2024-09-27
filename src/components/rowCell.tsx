import { Cell, flexRender, RowData } from "@tanstack/react-table";
import clsx from "clsx";

type Props<TData> = {
  cell: Cell<TData, RowData>;
};
export function RowCell<TData>({ cell }: Props<TData>) {
  const { column, getContext, getValue } = cell;
  const cellTitle =
    String(getValue()) === "undefined" ? column.id : String(getValue());

  return (
    <div
      title={cellTitle}
      role="cell"
      className={clsx(
        "flex h-full items-center overflow-hidden whitespace-nowrap border-r border-black-20 bg-transparent px-3 py-2 last:border-r-0 hover:z-10 dark:border-black-92.5 dark:bg-inherit",
        column.columnDef.meta?.className,
      )}
    >
      {flexRender(column.columnDef.cell, getContext())}
    </div>
  );
}
