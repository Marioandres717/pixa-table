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

export default function ColumnCell<TData>({
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
      role="cell"
      style={getColumnStyles({ ...column, ...virtualColumn })}
      className={clsx(
        "absolute left-0 top-0 flex h-9 items-center overflow-hidden border-r px-3 py-2 last:border-r-0 dark:border-black-92.5",
        column.columnDef.meta?.className,
        className,
      )}
    >
      <span
        title={cellTitle}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {flexRender(column.columnDef.cell, getContext())}
      </span>
    </div>
  );
}

function getColumnStyles<TData>({
  columnDef,
  size,
  start,
  getAfter,
  getIsPinned,
}: Column<TData, RowData> & VirtualItem<Element>) {
  const { minSize, meta } = columnDef;
  const isPinned = getIsPinned();
  return {
    justifyContent: meta?.align,
    padding: meta?.padding,
    width: size,
    minWidth: minSize,
    // maxWidth: maxSize,
    transform:
      !isPinned || isPinned === "left"
        ? `translate3d(${start}px, 0, 0)`
        : `translate3d(${getAfter(isPinned)}px, 0, 0)`,
  };
}
