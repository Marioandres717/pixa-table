import { Column, Row, RowData } from "@tanstack/react-table";
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

export function colRangeExtractor<TData>(
  range: Range,
  cols: Column<TData, RowData>[],
): number[] {
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

export function rowRangeExtractor<TData>(
  range: Range,
  rows: Row<TData>[],
): number[] {
  const expandedRows = getExpandedRowsIndexes(rows);
  const visibleRows = rows
    .slice(range.startIndex, range.endIndex + 1)
    .filter((row) => !row.getIsExpanded())
    .map((row) => rows.findIndex((r) => r.id === row.id));

  return [...expandedRows, ...visibleRows];
}

function getExpandedRowsIndexes<TData>(rows: Row<TData>[]): number[] {
  return rows
    .filter((row) => row.getIsExpanded())
    .map((row) => rows.findIndex((r) => r.id === row.id));
}

export function calculateGridTemplate(options?: {
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
}) {
  if (
    !options ||
    (options.showHeader && options.showFooter && !options.showSidebar)
  ) {
    return "grid grid-cols-[1fr] grid-rows-[44px_minMax(44px,auto)_44px]";
  }

  if (options.showHeader && options.showFooter && options.showSidebar) {
    return "grid  grid-cols-[1fr,32px] grid-rows-[44px_minMax(44px,auto)_44px]";
  }

  if (options.showHeader && !options.showFooter && !options.showSidebar) {
    return "grid grid-cols-[1fr] grid-rows-[44px_minMax(44px,auto)]";
  }

  if (options.showHeader && !options.showFooter && options.showSidebar) {
    return "grid grid-cols-[1fr,32px] grid-rows-[44px_minMax(44px,auto)]";
  }

  if (!options.showHeader && options.showFooter && !options.showSidebar) {
    return "grid grid-cols-[1fr] grid-rows-[minMax(44px,auto)_44px]";
  }

  if (!options.showHeader && options.showFooter && options.showSidebar) {
    return "grid grid-cols-[1fr,32px] grid-rows-[auto_44px]";
  }

  if (!options.showHeader && !options.showFooter && options.showSidebar) {
    return "grid grid-cols-[1fr,32px] grid-rows-[auto]";
  }

  return "grid grid-cols-[1fr] grid-rows-[auto]";
}
