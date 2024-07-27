import { useCallback, useEffect, useMemo } from "react";
import { Table, flexRender, Header } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import classNames from "classnames";

import { ColumnResize } from "./columnResize";
import { HeaderSorting } from "./headerSort";
import ColumnFilter from "./columnFilter";
import React from "react";
import { calculateViCols } from "../utils/gridGenerator";

type Props<TData> = {
  tableInstance: Table<TData>;
  parentRef: React.RefObject<HTMLDivElement>;
  className?: string;
  filterColumnComponent?: React.ComponentType<{
    header: Header<TData, unknown>;
  }>;
};

export function VirtualizedTableHeader<TData>({
  tableInstance: table,
  filterColumnComponent: Filter = ColumnFilter,
  parentRef,
  className,
}: Props<TData>) {
  const headerGroups = table.getHeaderGroups();
  const cols = useMemo(() => table.getVisibleFlatColumns(), [table]);
  const state = table.getState();

  const colVirtualizer = useVirtualizer({
    count: cols.length,
    estimateSize: useCallback((i) => cols[i].getSize(), [cols]),
    getScrollElement: () => parentRef.current,
    overscan: 5,
    horizontal: true,
  });

  const parentWidth = parentRef.current?.offsetWidth ?? 0;
  const rowHeaderWidth =
    parentWidth > colVirtualizer.getTotalSize()
      ? parentWidth
      : colVirtualizer.getTotalSize();

  const viCols = calculateViCols(cols, parentWidth, colVirtualizer);

  useEffect(() => {
    colVirtualizer.measure();
  }, [colVirtualizer, state.columnSizingInfo]);

  return (
    <div
      role="rowheader"
      className={classNames("sticky top-0 z-10 h-8", className)}
      {...{
        style: {
          width: `${rowHeaderWidth}px`,
        },
      }}
    >
      {headerGroups.map((headerGroup) => (
        <div
          role="row"
          className="grid h-8 border-b dark:border-black-92.5 dark:bg-black-95"
          {...{
            key: headerGroup.id,
          }}
        >
          {headerGroup.headers.map((header, i) => {
            const viCol = viCols.find((viCol) => viCol.index === i);
            if (!viCol) return null;
            const {
              column: { columnDef, getCanFilter, getCanResize, getCanSort },
              getContext,
            } = header;
            return (
              <div
                role="columnheader"
                className={classNames(
                  "absolute left-0 top-0 flex max-h-8 min-h-8 items-center overflow-hidden border-r px-3 py-2 text-xs uppercase tracking-wider last:border-r-0 dark:border-black-92.5 dark:text-black-40",
                  columnDef.meta?.className,
                )}
                key={viCol.key}
                data-index={viCol.index}
                style={{
                  justifyContent: columnDef.meta?.align,
                  width: `${viCol.size}px`,
                  transform: `translateX(${viCol.start}px)`,
                }}
              >
                <span
                  className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
                  onClick={header.column.getToggleSortingHandler()}
                  title={columnDef.header?.toString()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(columnDef.header, getContext())}
                </span>
                {getCanSort() && (
                  <HeaderSorting
                    header={header}
                    multiSort={state.sorting.length > 1}
                  />
                )}
                {getCanFilter() && <Filter header={header} />}
                {getCanResize() && <ColumnResize header={header} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
