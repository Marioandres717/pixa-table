import React, { useCallback, useEffect, useMemo } from "react";
import { Table, Header, RowData, Column } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import classNames from "classnames";
import { calculateViCols } from "../utils/gridGenerator";
import ColumnHeader from "./columnHeader";

type Props<TData> = {
  tableInstance: Table<TData>;
  parentRef: React.RefObject<HTMLDivElement>;
  className?: string;
  filterColumnComponent?: React.ComponentType<{
    header: Header<TData, RowData>;
  }>;
};

export type PinnedCols<TData> = {
  left: Column<TData, RowData>[];
  right: Column<TData, RowData>[];
};

export function VirtualizedTableHeader<TData>({
  tableInstance: table,
  filterColumnComponent,
  parentRef,
  className,
}: Props<TData>) {
  const headerGroups = table.getHeaderGroups();
  const cols = useMemo(() => table.getVisibleFlatColumns(), [table]);
  const { left, right } = useMemo(() => {
    return cols
      .filter((col) => col.getIsPinned())
      .reduce(
        (acc, col) => {
          if (col.getIsPinned() === "left") {
            acc.left.push(col);
          } else {
            acc.right.push(col);
          }
          return acc;
        },
        { left: [], right: [] } as PinnedCols<TData>,
      );
  }, [cols]);

  const state = table.getState();

  const colVirtualizer = useVirtualizer({
    count: cols.length,
    overscan: 5,
    horizontal: true,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback((i) => cols[i].getSize(), [cols]),
    getItemKey: useCallback((i) => cols[i].id, [cols]),
    debug: true,
  });

  const parentWidth = parentRef.current?.offsetWidth ?? 0;

  const colVirtualizerWidth = colVirtualizer.getTotalSize();

  const rowHeaderWidth =
    parentWidth > colVirtualizerWidth ? parentWidth : colVirtualizerWidth;

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
          className="h-8 border-b dark:border-black-92.5 dark:bg-black-95"
          {...{
            key: headerGroup.id,
          }}
        >
          {/* LEFT PINNED COLS */}
          <div
            className="sticky left-0 top-0 z-10 h-full bg-inherit"
            style={{
              width: left.reduce((acc, col) => acc + col.getSize(), 0),
            }}
          >
            {headerGroup.headers
              .filter((header) => header.column.getIsPinned() === "left")
              .map((header) => {
                const viCol = viCols.find((viCol) => viCol.key === header.id);
                if (!viCol) return null;
                return (
                  <ColumnHeader
                    key={viCol.key}
                    header={header}
                    virtualColumn={viCol}
                    state={state}
                  />
                );
              })}
          </div>

          {/* RIGHT PINNED COLS */}
          <div
            className="sticky left-0 top-0 z-10 h-full -translate-y-8 bg-transparent"
            style={{
              width: right.reduce((acc, col) => acc + col.getSize(), 0),
              left:
                parentWidth -
                right.reduce((acc, col) => acc + col.getSize(), 0),
            }}
          >
            {headerGroup.headers
              .filter((header) => header.column.getIsPinned() === "right")
              .map((header) => {
                const viCol = viCols.find((viCol) => viCol.key === header.id);
                if (!viCol) return null;
                return (
                  <ColumnHeader
                    key={viCol.key}
                    header={header}
                    virtualColumn={viCol}
                    state={state}
                  />
                );
              })}
          </div>

          {/* NON-PINNED COLS */}
          {headerGroup.headers
            .filter((header) => !header.column.getIsPinned())
            .map((header) => {
              const viCol = viCols.find((viCol) => viCol.key === header.id);
              if (!viCol) return null;
              return (
                <ColumnHeader
                  key={viCol.key}
                  header={header}
                  virtualColumn={viCol}
                  state={state}
                  filterColumnComponent={filterColumnComponent}
                />
              );
            })}
        </div>
      ))}
    </div>
  );
}
