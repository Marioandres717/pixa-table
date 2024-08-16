import { Column, RowData } from "@tanstack/react-table";
import { Range } from "@tanstack/react-virtual";

export type PinnedCols<TData> = {
  left: Column<TData, RowData>[];
  right: Column<TData, RowData>[];
};

export function getPinnedCols<TData>(
  cols: Column<TData, RowData>[],
): PinnedCols<TData> {
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
}

export function rangeExtractor<TData>(
  range: Range,
  cols: Column<TData, RowData>[],
) {
  const { left, right } = getPinnedCols(cols);
  const pinnedCols = [
    ...left.map((l) => cols.findIndex((col) => col.id === l.id)),
    ...right.map((r) => cols.findIndex((col) => col.id === r.id)),
  ];
  const visibleCols = cols
    .slice(range.startIndex, range.endIndex + 1)
    .filter((col) => !col.getIsPinned())
    .map((col) => cols.findIndex((c) => c.id === col.id));

  return [...pinnedCols, ...visibleCols];
}
