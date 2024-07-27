import { Row, Table, flexRender } from "@tanstack/react-table";
import React, { useCallback, useEffect, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import classNames from "classnames";
import { calculateViCols } from "../utils/gridGenerator";

type Props<TData> = {
  tableInstance: Table<TData>;
  parentRef: React.RefObject<HTMLDivElement>;
  className?: string;
  expandableRowComponent?: React.ComponentType<{ row: Row<TData> }>;
};

export function VirtualizedTableBody<TData>({
  tableInstance: table,
  parentRef,
  expandableRowComponent: ExpandRow,
  className,
}: Props<TData>) {
  const rows = table.getRowModel().rows;
  const cols = useMemo(() => table.getVisibleFlatColumns(), [table]);
  const state = table.getState();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: useCallback(
      (i) => (rows[i].getIsExpanded() ? 400 : 36),
      [rows],
    ),
    getScrollElement: () => parentRef.current,
    overscan: 5,
  });

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

  const viRows = rowVirtualizer.getVirtualItems();
  const viCols = calculateViCols(cols, parentWidth, colVirtualizer);

  useEffect(() => {
    rowVirtualizer.measure();
  }, [rows, rowVirtualizer]);

  useEffect(() => {
    colVirtualizer.measure();
  }, [colVirtualizer, state.columnSizingInfo]);

  return (
    <div
      className={classNames("relative", className)}
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: `${rowHeaderWidth}px`,
      }}
    >
      {viRows.map((viRow) => {
        const row = rows[viRow.index];
        return (
          <div
            role="row"
            className={`absolute left-0 top-0 w-full overflow-hidden border-b transition-[height] dark:border-black-92.5 dark:bg-black-100 dark:hover:bg-black-90 ${row.getIsExpanded() && "dark:!bg-black-95"} ${row.getIsSelected() && "dark:!bg-[#173344]"}`}
            key={viRow.key}
            data-index={viRow.index}
            {...{
              style: {
                height: `${viRow.size}px`,
                transform: `translateY(${viRow.start}px)`,
              },
            }}
          >
            {row.getVisibleCells().map((cell, i) => {
              const {
                column: { columnDef },
                getContext,
              } = cell;
              const viCol = viCols.find((c) => c.index === i);

              if (!viCol) return null;

              return (
                <div
                  role="cell"
                  className={classNames(
                    "absolute left-0 top-0 flex min-h-9 items-center overflow-hidden border-r px-3 py-2 last:border-r-0 dark:border-black-92.5",
                    columnDef.meta?.className,
                  )}
                  key={viCol.key}
                  data-index={viCol.index}
                  style={{
                    textAlign: columnDef.meta?.align,
                    padding: columnDef.meta?.padding,
                    width: `${viCol.size}px`,
                    transform: `translateX(${viCol.start}px)`,
                  }}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {flexRender(columnDef.cell, getContext())}
                  </span>
                </div>
              );
            })}

            {row.getIsExpanded() && ExpandRow && (
              <div
                className="absolute w-full border-t dark:border-black-92.5"
                style={{
                  transform: `translateY(36px)`,
                }}
              >
                <ExpandRow row={row} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
