import {
  Cell,
  Column,
  flexRender,
  Getter,
  RowData,
  Table,
} from "@tanstack/react-table";
import clsx from "clsx";
import { getCellPinnedStyles } from "../utils";

type Props<TData> = {
  cell: Cell<TData, RowData>;
  table: Table<TData>;
};
export function RowCell<TData>({ cell, table }: Props<TData>) {
  const {
    column,
    getContext,
    getValue,
    row: { getIsExpanded },
  } = cell;
  const cellTitle = getCellTitle(getValue, column);
  const { rowHeight } = table.getLayout();
  const whiteSpaceWrapping = getWhiteSpaceWrapping(getIsExpanded, rowHeight);

  return (
    <div
      title={cellTitle}
      role="cell"
      className={clsx(
        "flex items-start overflow-hidden border-r border-black-20 bg-transparent px-3 py-2 last:border-r-0 dark:border-black-92.5 dark:bg-inherit",
        whiteSpaceWrapping,
        column.columnDef.meta?.className,
        { "border-r-0": column.getIsLastColumn() },
      )}
      style={getCellPinnedStyles(cell.column)}
    >
      {flexRender(column.columnDef.cell, getContext())}
    </div>
  );
}

function getCellTitle<TData>(
  getValue: Getter<unknown>,
  column: Column<TData, unknown>,
) {
  return String(getValue()) === "undefined" ? column.id : String(getValue());
}

function getWhiteSpaceWrapping(
  getIsExpanded: () => boolean,
  rowHeight?: number | "dynamic" | undefined,
) {
  return rowHeight === "dynamic" && getIsExpanded()
    ? "whitespace-normal break-all h-full"
    : "whitespace-nowrap h-9";
}
