import { flexRender, Header, RowData, TableState } from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import classNames from "classnames";
import { ColumnResize } from "./columnResize";
import { getColumnStyles } from "../utils/gridGenerator";
import { HeaderSorting } from "./headerSort";

type Props<TData> = {
  header: Header<TData, RowData>;
  virtualColumn: VirtualItem<Element>;
  state: TableState;
  className?: string;
};

export default function ColumnHeader<TData>({
  className,
  header,
  state,
  virtualColumn,
}: Props<TData>) {
  const { key, index } = virtualColumn;
  const {
    getContext,
    column: {
      columnDef,
      getToggleSortingHandler,
      getCanSort,
      //   getCanFilter,
      getCanResize,
    },
  } = header;
  return (
    <div
      key={key}
      data-index={index}
      role="columnheader"
      style={getColumnStyles({ ...header.column, ...virtualColumn })}
      className={classNames(
        "absolute left-0 top-0 flex max-h-8 min-h-8 items-center overflow-hidden border-r px-3 py-2 text-xs uppercase tracking-wider last:border-r-0 dark:border-black-92.5 dark:text-black-40",
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
      {getCanSort() && (
        <HeaderSorting header={header} multiSort={state.sorting.length > 1} />
      )}
      {/* {getCanFilter() && <Filter header={header} />} */}
      {getCanResize() && <ColumnResize header={header} />}
    </div>
  );
}
