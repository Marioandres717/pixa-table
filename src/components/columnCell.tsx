import {
  Cell,
  Column,
  flexRender,
  RowData,
  TableState,
} from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";

type Props<TData> = {
  cell: Cell<TData, RowData>;
  virtualColumn: VirtualItem<Element>;
  state?: TableState;
  className?: string;
};

export function ColumnCell<TData>({
  cell,
  virtualColumn,
  className,
}: Props<TData>) {
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
        "absolute left-0 top-0 flex h-full overflow-hidden whitespace-nowrap border-r px-3 py-2 last:border-r-0 dark:border-black-92.5",
        column.columnDef.meta?.className,
        className,
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
