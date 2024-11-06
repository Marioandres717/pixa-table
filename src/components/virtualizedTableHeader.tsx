import React, { useCallback, useEffect, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { useVirtualizer, Range } from "@tanstack/react-virtual";
import clsx from "clsx";
import { colRangeExtractor, divideAvailableSpaceWithColumns } from "../utils";
import { VirtualizedHeaderRow } from "./virtualizedHeaderRow";
import { HeaderRow } from "./headerRow";

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
  const isDynamicRowHeight = table.getLayout().rowHeight === "dynamic";
  const cols = useMemo(
    () =>
      divideAvailableSpaceWithColumns(
        headerGroups[0].headers.map((header) => header.column),
        parentWidth,
      ),
    [headerGroups, parentWidth],
  );

  const colVirtualizer = useVirtualizer({
    enabled: !isDynamicRowHeight,
    count: cols.length,
    overscan: 5,
    horizontal: true,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback((i) => cols[i].getSize(), [cols]),
    getItemKey: useCallback((i: number) => cols[i].id, [cols]),
    rangeExtractor: useCallback(
      (range: Range) => colRangeExtractor(range, cols),
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
      {headerGroups.map((headerGroup) =>
        isDynamicRowHeight ? (
          <HeaderRow
            key={headerGroup.id}
            headerGroup={headerGroup}
            table={table}
          />
        ) : (
          <VirtualizedHeaderRow
            key={headerGroup.id}
            cols={cols}
            headerGroup={headerGroup}
            state={state}
            colVirtualizer={colVirtualizer}
          />
        ),
      )}
    </div>
  );
}
