import {
  Cell,
  Column,
  flexRender,
  RowData,
  Table,
} from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";

type Props<TData> = {
  cell: Cell<TData, RowData>;
  virtualColumn: VirtualItem;
  table: Table<TData>;
  className?: string;
};

export function VirtualizedRowCell<TData>({
  cell,
  virtualColumn,
  table,
  className,
}: Props<TData>) {
  const { column, getContext, getValue } = cell;
  const cellTitle =
    String(getValue()) === "undefined" ? column.id : String(getValue());
  const cellContent = flexRender(column.columnDef.cell, getContext());

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
        "pxt-border-cell absolute left-0 top-0 flex items-center overflow-hidden whitespace-nowrap bg-inherit px-3 py-2 hover:z-10",
        {
          "bg-surface group-hover:bg-interaction-hover": column.getIsPinned(),
          "group-hover:active-bg": cell.row.getIsSelected(),
          "!border-r-0": column.getIsLastColumn("center"),
        },
        column.columnDef.meta?.className,
        className,
      )}
      data-active={cell.row.getIsSelected()}
    >
      {typeof cellContent === "string" || column.columnDef.meta?.showOnHover ? (
        <span
          className={clsx(
            "pointer-events-none inline-block group-hover:pointer-events-auto",
            {
              "sr-only opacity-0 group-hover:not-sr-only group-hover:opacity-100":
                column.columnDef.meta?.showOnHover,
            },
          )}
        >
          {cellContent}
        </span>
      ) : (
        cellContent
      )}
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
  const cellHeight = rowHeight === "dynamic" ? "auto" : rowHeight;

  return {
    width: size,
    height: cellHeight,
    transform:
      !isPinned || isPinned === "left"
        ? `translate3d(${start}px, 0, 0)`
        : `translate3d(${getAfter(isPinned)}px, 0, 0)`,
  };
}
