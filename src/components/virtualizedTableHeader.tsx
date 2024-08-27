import React, { useCallback, useEffect, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import {
  getPinnedCols,
  colRangeExtractor,
  divideAvailableSpaceWithColumns,
} from "../utils";
import ColumnHeader from "./columnHeader";

type Props<TData> = {
  table: Table<TData>;
  parentRef: React.RefObject<HTMLDivElement>;
  className?: string;
};

export function VirtualizedTableHeader<TData>({
  table: table,
  parentRef,
  className,
}: Props<TData>) {
  const headerGroups = table.getHeaderGroups();
  const parentWidth = parentRef.current?.offsetWidth ?? 0;
  const cols = useMemo(
    () =>
      divideAvailableSpaceWithColumns(
        headerGroups[0].headers.map((header) => header.column),
        parentWidth,
      ),
    [headerGroups, parentWidth],
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
    rangeExtractor: useCallback(
      (range) => colRangeExtractor(range, cols),
      [cols],
    ),
  });

  const colVirtualizerWidth = colVirtualizer.getTotalSize();

  const rowHeaderWidth =
    parentWidth > colVirtualizerWidth ? parentWidth : colVirtualizerWidth;

  const viCols = colVirtualizer.getVirtualItems();

  useEffect(() => {
    colVirtualizer.measure();
  }, [colVirtualizer, state.columnSizingInfo]);

  return (
    <div
      data-test-id="table-header"
      role="rowgroup"
      className={clsx("sticky top-0 z-10 h-8", className)}
      {...{
        style: {
          width: `${rowHeaderWidth}px`,
        },
      }}
    >
      {headerGroups.map((headerGroup) => (
        <div
          key={headerGroup.id}
          role="row"
          className="flex h-8 border-b bg-black-10 dark:border-black-92.5 dark:bg-black-95"
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

          {/* NON-PINNED COLS */}
          <div className="h-full w-full">
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
                  />
                );
              })}
          </div>

          {/* RIGHT PINNED COLS */}
          <div
            className="sticky right-0 top-0 z-10 h-full bg-inherit"
            style={{
              width: right.reduce((acc, col) => acc + col.getSize(), 0),
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
        </div>
      ))}
    </div>
  );
}
