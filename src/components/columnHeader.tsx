import {
  Column,
  flexRender,
  Header,
  RowData,
  TableState,
} from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";
import { ColumnResize } from "./columnResize";
import { HeaderSorting } from "./columnSort";
import { HeaderFilter as DefaultFilter } from "./columnFilter";

type Props<TData> = {
  header: Header<TData, RowData>;
  virtualColumn: VirtualItem;
  state: TableState;
  className?: string;
};

export default function ColumnHeader<TData>({
  className,
  header,
  state,
  virtualColumn,
}: Props<TData>) {
  const {
    column: { columnDef, getToggleSortingHandler, id },
    getContext,
    getHeaderFilterComponent,
  } = header;
  const Filter = getHeaderFilterComponent() || DefaultFilter;
  const headerTitle =
    typeof columnDef.header === "string" ? columnDef.header : id;

  return (
    <div
      data-id={virtualColumn.key}
      role="columnheader"
      style={getColumnStyles({ ...header.column, ...virtualColumn })}
      className={clsx(
        "absolute left-0 top-0 flex h-full items-center overflow-hidden border-r border-black-20 px-3 py-2 text-col-heading uppercase tracking-[0.66px] text-black-50 last:border-r-0 dark:border-black-92.5 dark:text-black-40",
        className,
        columnDef.meta?.headerClassName,
      )}
    >
      <span
        title={headerTitle}
        className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
        onClick={getToggleSortingHandler()}
      >
        {header.isPlaceholder
          ? null
          : flexRender(columnDef.header, getContext())}
      </span>
      <HeaderSorting header={header} multiSort={state.sorting.length > 1} />
      <Filter header={header} />
      <ColumnResize header={header} />
    </div>
  );
}

function getColumnStyles<TData>({
  size,
  start,
  getAfter,
  getIsPinned,
}: Column<TData, RowData> & VirtualItem) {
  const isPinned = getIsPinned();

  return {
    width: size,
    transform:
      !isPinned || isPinned === "left"
        ? `translate3d(${start}px, 0, 0)`
        : `translate3d(${getAfter(isPinned)}px, 0, 0)`,
  };
}
