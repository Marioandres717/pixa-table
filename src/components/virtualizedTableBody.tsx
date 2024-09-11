import React, { useCallback, useEffect, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  colRangeExtractor,
  rowRangeExtractor,
  divideAvailableSpaceWithColumns,
} from "../utils";
import { VirtualizedRow } from "./virtualizedRow";

type Props<TData> = {
  table: Table<TData>;
  parentRef: React.RefObject<HTMLDivElement>;
};

export function VirtualizedTableBody<TData>({
  table: table,
  parentRef,
}: Props<TData>) {
  const rows = table.getRowModel().rows;
  const tableState = table.getState();
  const parentWidth = parentRef.current?.offsetWidth ?? 0;
  const { rowHeight = 36, expandableRowHeight = 100 } = table.getLayout();

  const cols = useMemo(
    () =>
      divideAvailableSpaceWithColumns(
        table.getFlatHeaders().map((h) => h.column),
        parentWidth,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, tableState, parentWidth],
  );

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    overscan: 5,
    getScrollElement: () => parentRef.current,
    getItemKey: useCallback((i) => rows[i].id, [rows]),
    estimateSize: useCallback(
      (i) => {
        if (rows[i].getIsExpanded()) {
          return expandableRowHeight;
        }
        if (rowHeight === "dynamic") {
          return 36;
        }
        return rowHeight;
      },
      [rows, expandableRowHeight, rowHeight],
    ),
    rangeExtractor: useCallback(
      (range) => rowRangeExtractor(range, rows),
      [rows],
    ),
  });

  const colVirtualizer = useVirtualizer({
    count: cols.length,
    overscan: 5,
    horizontal: true,
    getScrollElement: () => parentRef.current,
    getItemKey: useCallback((i) => cols[i].id, [cols]),
    estimateSize: useCallback((i) => cols[i].getSize(), [cols]),
    rangeExtractor: useCallback(
      (range) => colRangeExtractor(range, cols),
      [cols],
    ),
  });

  const colVirtualizerWidth = colVirtualizer.getTotalSize();

  const rowWidth =
    parentWidth > colVirtualizerWidth ? parentWidth : colVirtualizerWidth;

  const viRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    rowVirtualizer.measure();
  }, [rows, rowVirtualizer]);

  return (
    <div
      data-testid="table-body"
      role="rowgroup"
      className="relative"
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: `${rowWidth}px`,
      }}
    >
      {viRows.map((viRow) => {
        const row = rows[viRow.index];
        return (
          <VirtualizedRow
            key={viRow.key}
            row={row}
            cols={cols}
            viRow={viRow}
            rowVirtualizer={rowVirtualizer}
            colVirtualizer={colVirtualizer}
            rowWidth={rowWidth}
            table={table}
          />
        );
      })}
    </div>
  );
}
