import { Table } from "@tanstack/react-table";
import React, { useCallback, useEffect, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getPinnedCols, colRangeExtractor, rowRangeExtractor } from "../utils";
import { ColumnCell } from "./columnCell";

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
  const cols = useMemo(
    () => table.getFlatHeaders().map((h) => h.column),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, tableState],
  );
  const { left, right } = useMemo(() => getPinnedCols(cols), [cols]);
  const state = table.getState();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    overscan: 5,
    paddingStart: 32,
    getScrollElement: () => parentRef.current,
    getItemKey: useCallback((i) => rows[i].id, [rows]),
    estimateSize: useCallback(
      (i) => (rows[i].getIsExpanded() ? 400 : 36),
      [rows],
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

  const parentWidth = parentRef.current?.offsetWidth ?? 0;
  const rowHeaderWidth =
    parentWidth > colVirtualizer.getTotalSize()
      ? parentWidth
      : colVirtualizer.getTotalSize();

  const viRows = rowVirtualizer.getVirtualItems();
  const viCols = colVirtualizer.getVirtualItems();

  useEffect(() => {
    rowVirtualizer.measure();
  }, [rows, rowVirtualizer, state.expanded]);

  useEffect(() => {
    colVirtualizer.measure();
  }, [colVirtualizer, state.columnSizingInfo]);

  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: `${rowHeaderWidth}px`,
      }}
    >
      {viRows.map((viRow) => {
        const row = rows[viRow.index];
        const ExpandableRow = row.getExpandableRow();
        return (
          <div
            role="row"
            className={`group absolute left-0 top-0 border-b bg-black-5 dark:border-black-92.5 dark:bg-black-100 dark:hover:bg-black-90 ${row.getIsExpanded() && "dark:!bg-black-95"} ${row.getIsSelected() && "dark:!bg-[#173344]"}`}
            key={viRow.key}
            data-index={viRow.index}
            {...{
              style: {
                width: rowHeaderWidth,
                height: `${viRow.size}px`,
                transform: `translateY(${viRow.start}px)`,
              },
            }}
          >
            {/* Expandable Row */}
            {row.getIsExpanded() && ExpandableRow && (
              <div className="absolute left-0 top-9 z-50 w-full border-t dark:border-black-92.5">
                <ExpandableRow row={row} />
              </div>
            )}

            {/* LEFT PINNED CELLS */}
            <div
              className="sticky left-0 top-0 z-10 bg-inherit"
              style={{
                height: row.getIsExpanded() ? "auto" : "100%",
                width: left.reduce((acc, cell) => acc + cell.getSize(), 0),
                position: row.getIsExpanded() ? "absolute" : "sticky",
              }}
            >
              {row.getLeftVisibleCells().map((cell) => {
                const viCol = viCols.find((c) => c.key === cell.column.id);
                if (!viCol) return null;
                return (
                  <ColumnCell
                    key={viCol.key}
                    cell={cell}
                    virtualColumn={viCol}
                  />
                );
              })}
            </div>

            {/* RIGHT PINNED CELLS */}
            <div
              className="sticky left-0 top-0 z-10 h-9 -translate-y-9 bg-inherit opacity-0 group-hover:opacity-100"
              style={{
                position: row.getIsExpanded() ? "absolute" : "sticky",
                width: right.reduce((acc, cell) => acc + cell.getSize(), 0),
                top: row.getIsExpanded() ? 36 : 0,
                left: row.getIsExpanded()
                  ? rowHeaderWidth -
                    row
                      .getRightVisibleCells()
                      .reduce((acc, cell) => acc + cell.column.getSize(), 0)
                  : parentWidth -
                    row
                      .getRightVisibleCells()
                      .reduce((acc, cell) => acc + cell.column.getSize(), 0),
              }}
            >
              {row.getRightVisibleCells().map((cell) => {
                const viCol = viCols.find((c) => c.key === cell.column.id);
                if (!viCol) return null;
                return (
                  <ColumnCell
                    key={viCol.key}
                    cell={cell}
                    virtualColumn={viCol}
                  />
                );
              })}
            </div>

            {/* NON-PINNED CELLS */}
            {row.getCenterVisibleCells().map((cell) => {
              const viCol = viCols.find((c) => c.key === cell.column.id);
              if (!viCol) return null;
              return (
                <ColumnCell key={viCol.key} cell={cell} virtualColumn={viCol} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
