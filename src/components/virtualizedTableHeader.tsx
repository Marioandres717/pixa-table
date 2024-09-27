import React, { useCallback, useEffect, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { colRangeExtractor, divideAvailableSpaceWithColumns } from "../utils";
import { VirtualizedHeaderRow } from "./virtualizedHeaderRow";

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
  const state = table.getState();
  const parentWidth = parentRef.current?.offsetWidth ?? 0;
  const cols = useMemo(
    () =>
      divideAvailableSpaceWithColumns(
        headerGroups[0].headers.map((header) => header.column),
        parentWidth,
      ),
    [headerGroups, parentWidth],
  );

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

  useEffect(() => {
    colVirtualizer.measure();
  }, [colVirtualizer, state.columnSizingInfo]);

  return (
    <div
      data-testid="table-header"
      role="rowgroup"
      className={clsx("sticky top-0 z-10 h-8", className)}
      style={{
        width: `${rowHeaderWidth}px`,
      }}
    >
      {headerGroups.map((headerGroup) => (
        <VirtualizedHeaderRow
          key={headerGroup.id}
          cols={cols}
          headerGroup={headerGroup}
          state={state}
          colVirtualizer={colVirtualizer}
        />
      ))}
    </div>
  );
}
