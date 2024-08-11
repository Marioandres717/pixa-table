import { Row, Table } from "@tanstack/react-table";
import React, { useCallback, useEffect, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getPinnedCols } from "../utils";
import ColumnCell from "./columnCell";

type Props<TData> = {
  table: Table<TData>;
  parentRef: React.RefObject<HTMLDivElement>;
  className?: string;
  expandableRowComponent?: React.ComponentType<{ row: Row<TData> }>;
};

export function VirtualizedTableBody<TData>({
  table: table,
  parentRef,
  expandableRowComponent: ExpandRow,
}: Props<TData>) {
  const rows = table.getRowModel().rows;
  const tableState = table.getState();
  const cols = useMemo(
    () => table.getFlatHeaders().map((h) => h.column),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, tableState],
  );
  const { left, right } = useMemo(() => getPinnedCols(cols), [cols]);
  const leftSpace = left.reduce((acc, col) => acc + col.getSize(), 0);
  const rightSpace = right.reduce((acc, col) => acc + col.getSize(), 0);
  const availableSpace =
    parentRef.current?.offsetWidth ?? 0 - leftSpace - rightSpace;
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
  });

  const colVirtualizer = useVirtualizer({
    count: cols.length,
    overscan: 5,
    horizontal: true,
    getScrollElement: () => parentRef.current,
    getItemKey: useCallback((i) => cols[i].id, [cols]),
    estimateSize: useCallback(
      (i) => {
        const col = cols[i];
        if (col.getIsPinned()) return col.getSize();
        const colsNumber = cols.length - left.length - right.length;
        const singleColWidth = availableSpace / colsNumber;
        const r =
          singleColWidth > col.getSize() ? singleColWidth : col.getSize();
        return r;
      },
      [cols, availableSpace, left, right],
    ),
    rangeExtractor: useCallback(
      (range) => {
        const pinnedCols = [
          ...left.map((l) => cols.findIndex((col) => col.id === l.id)),
          ...right.map((r) => cols.findIndex((col) => col.id === r.id)),
        ];
        const visibleCols = cols
          .slice(range.startIndex, range.endIndex + 1)
          .filter((col) => !col.getIsPinned())
          .map((col) => cols.findIndex((c) => c.id === col.id));
        return [...pinnedCols, ...visibleCols];
      },
      [cols, left, right],
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

        return (
          <div
            role="row"
            className={`absolute left-0 top-0 w-full border-b bg-black-5 transition-[height] dark:border-black-92.5 dark:bg-black-100 dark:hover:bg-black-90 ${row.getIsExpanded() && "dark:!bg-black-95"} ${row.getIsSelected() && "dark:!bg-[#173344]"}`}
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
            {/* LEFT PINNED CELLS */}
            <div
              className="sticky left-0 top-0 z-10 bg-inherit"
              style={{
                height: row.getIsExpanded() ? "auto" : "100%",
                width: row
                  .getLeftVisibleCells()
                  .reduce((acc, cell) => acc + cell.column.getSize(), 0),
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
              className="sticky left-0 top-0 z-10 h-9 -translate-y-9 bg-transparent"
              style={{
                position: row.getIsExpanded() ? "absolute" : "sticky",
                width: row
                  .getRightVisibleCells()
                  .reduce((acc, cell) => acc + cell.column.getSize(), 0),
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

            {row.getIsExpanded() && ExpandRow && (
              <div className="absolute left-0 top-9 z-50 w-full border-t dark:border-black-92.5">
                <ExpandRow row={row} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
