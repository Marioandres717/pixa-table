import {
  Column,
  flexRender,
  Header,
  RowData,
  TableState,
} from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import classNames from "classnames";
import { ColumnResize } from "./columnResize";
import { HeaderSorting } from "./headerSort";
import ColumnFilter from "./columnFilter";

type Props<TData> = {
  header: Header<TData, RowData>;
  virtualColumn: VirtualItem<Element>;
  state: TableState;
  className?: string;
  filterColumnComponent?: React.ComponentType<{
    header: Header<TData, RowData>;
  }>;
};

export default function ColumnHeader<TData>({
  className,
  header,
  state,
  virtualColumn,
  filterColumnComponent: Filter = ColumnFilter,
}: Props<TData>) {
  const {
    column: { columnDef, getToggleSortingHandler },
    getContext,
  } = header;

  return (
    <div
      role="columnheader"
      style={getColumnStyles({ ...header.column, ...virtualColumn })}
      className={classNames(
        "absolute left-0 top-0 flex max-h-8 items-center border-r px-3 py-2 text-xs uppercase tracking-wider last:border-r-0 dark:border-black-92.5 dark:text-black-40",
        className,
        columnDef.meta?.className,
      )}
    >
      <span
        className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
        onClick={getToggleSortingHandler()}
        title={columnDef.header?.toString()}
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
  columnDef: { minSize, maxSize },
}: Column<TData, RowData> & VirtualItem<Element>) {
  const isPinned = getIsPinned();

  return {
    width: size,
    minWidth: minSize,
    maxWidth: maxSize,
    transform:
      !isPinned || isPinned === "left"
        ? `translate3d(${start}px, 0, 0)`
        : `translate3d(${getAfter()}px, 0, 0)`,
  };
}
