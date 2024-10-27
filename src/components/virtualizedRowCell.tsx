import {
  Cell,
  Column,
  flexRender,
  RowData,
  Table,
} from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";
import { calculateHeightOfCells } from "../utils";

type Props<TData> = {
  cell: Cell<TData, RowData>;
  virtualColumn: VirtualItem;
  table: Table<TData>;
};

export function VirtualizedRowCell<TData>({
  cell,
  virtualColumn,
  table,
}: Props<TData>) {
  const { column, getContext, getValue } = cell;
  const cellTitle =
    String(getValue()) === "undefined" ? column.id : String(getValue());

  return (
    <div
      data-id={virtualColumn.key}
      title={cellTitle}
      role="cell"
      style={getColumnStyles({
        ...column,
        ...virtualColumn,
        ...table,
      })}
      className={clsx(
        "absolute left-0 top-0 flex h-full items-center overflow-hidden whitespace-nowrap border-r border-black-20 bg-inherit px-3 py-2 last:border-r-0 hover:z-10 dark:border-black-92.5",
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
  getLayout,
}: Column<TData, RowData> & VirtualItem & Table<TData>) {
  const isPinned = getIsPinned();
  const { rowHeight = 36 } = getLayout();
  const cellHeight =
    rowHeight === "dynamic" ? "auto" : calculateHeightOfCells(rowHeight);

  return {
    width: size,
    maxHeight: cellHeight,
    transform:
      !isPinned || isPinned === "left"
        ? `translate3d(${start}px, 0, 0)`
        : `translate3d(${getAfter(isPinned)}px, 0, 0)`,
  };
}
