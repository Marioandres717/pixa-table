import { Cell, Column, flexRender, RowData } from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";

type Props<TData> = {
  cell: Cell<TData, RowData>;
  virtualColumn: VirtualItem<Element>;
};

export function ColumnCell<TData>({ cell, virtualColumn }: Props<TData>) {
  const { column, getContext, getValue } = cell;
  const cellTitle =
    String(getValue()) === "undefined" ? column.id : String(getValue());
  return (
    <div
      data-id={virtualColumn.key}
      title={cellTitle}
      role="cell"
      style={getColumnStyles({ ...column, ...virtualColumn })}
      className={clsx(
        "absolute left-0 top-0 flex h-full max-h-[35px] overflow-hidden whitespace-nowrap border-r bg-inherit px-3 py-2 last:border-r-0 hover:z-10 dark:border-black-92.5",
        column.columnDef.meta?.className,
      )}
    >
      {flexRender(column.columnDef.cell, getContext())}
    </div>
  );
}

function getColumnStyles<TData>({
  size,
  start,
  getAfter,
  getIsPinned,
}: Column<TData, RowData> & VirtualItem<Element>) {
  const isPinned = getIsPinned();
  return {
    width: size,
    transform:
      !isPinned || isPinned === "left"
        ? `translate3d(${start}px, 0, 0)`
        : `translate3d(${getAfter(isPinned)}px, 0, 0)`,
  };
}
