import { flexRender, Header, RowData, TableState } from "@tanstack/react-table";
import { HeaderSorting } from "./columnSort";
import { ColumnResize } from "./columnResize";
import { HeaderFilter as DefaultFilter } from "./columnFilter";
import clsx from "clsx";
import { getCellPinnedStyles } from "../utils";

type Props<TData> = {
  header: Header<TData, RowData>;
  state: TableState;
  className?: string;
};

export function HeaderCell<TData>({ className, header, state }: Props<TData>) {
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
      role="columnheader"
      className={clsx(
        "pxt-border-cell relative flex h-full items-center overflow-hidden px-3 py-2 text-col-heading uppercase tracking-[0.66px] text-black-50 dark:text-black-40",
        {
          "!border-r-0": header.column.getIsLastColumn("center"),
        },
        className,
        columnDef.meta?.headerClassName,
      )}
      style={getCellPinnedStyles(header.column)}
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
