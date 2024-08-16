import React, { useCallback, useEffect, useMemo } from "react";
import { Table, Header, RowData } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { getPinnedCols, rangeExtractor } from "../utils";
import ColumnHeader from "./columnHeader";

type Props<TData> = {
  table: Table<TData>;
  parentRef: React.RefObject<HTMLDivElement>;
  className?: string;
  filterColumnComponent?: React.ComponentType<{
    header: Header<TData, RowData>;
  }>;
};

export function VirtualizedTableHeader<TData>({
  table: table,
  filterColumnComponent,
  parentRef,
  className,
}: Props<TData>) {
  const headerGroups = table.getHeaderGroups();
  const cols = useMemo(
    () => headerGroups[0].headers.map((header) => header.column),
    [headerGroups],
  );
  const state = table.getState();
  const { left, right } = useMemo(() => getPinnedCols(cols), [cols]);

  const colVirtualizer = useVirtualizer({
    count: cols.length,
    overscan: 5,
    horizontal: true,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback((i) => cols[i].getSize(), [cols]),
    getItemKey: useCallback((i) => cols[i].id, [cols]),
    rangeExtractor: useCallback((range) => rangeExtractor(range, cols), [cols]),
  });

  const colVirtualizerWidth = colVirtualizer.getTotalSize();

  const parentWidth = parentRef.current?.offsetWidth ?? 0;
  const rowHeaderWidth =
    parentWidth > colVirtualizerWidth ? parentWidth : colVirtualizerWidth;

  const viCols = colVirtualizer.getVirtualItems();

  useEffect(() => {
    colVirtualizer.measure();
  }, [colVirtualizer, state.columnSizingInfo]);

  return (
    <div
      role="rowheader"
      className={clsx("sticky top-0 z-10 h-8", className)}
      {...{
        style: {
          width: `${rowHeaderWidth}px`,
        },
      }}
    >
      {headerGroups.map((headerGroup) => (
        <div
          role="row"
          className="h-8 border-b bg-black-10 dark:border-black-92.5 dark:bg-black-95"
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
