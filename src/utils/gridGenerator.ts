import { Cell, Column, Header, Row, RowData } from "@tanstack/react-table";
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

export function divideAvailableSpaceWithColumns<TData>(
  columns: Column<TData, RowData>[],
  availableWidth: number,
  columnMinWidth = 150,
) {
  // no available space
  if (
    columns.reduce((acc, col) => acc + (col.columnDef.size || 0), 0) >
    availableWidth
  )
    return columns;

  for (const column of columns) {
    if (column.columnDef.grow === false && column.columnDef.size) {
      availableWidth -= column.columnDef.size;
    }
  }
  const fieldCountWithGrow = columns.filter(
    (c) => c.columnDef.grow || typeof c.columnDef.grow === "undefined", // we want to default undefined as true
  ).length;

  const sharedWidth = availableWidth / fieldCountWithGrow;
  for (const column of columns) {
    if (column.columnDef.grow !== false) {
      column.columnDef.size = Math.max(
        sharedWidth,
        column.columnDef.minSize || columnMinWidth,
      );
    }
  }

  return columns;
}

export function calculateHeightOfCells(rowHeight: number) {
  return `calc(${rowHeight}px - 1px)`; // 1px is the border
}

export function tableBodygridGenerator<TData>(
  cells: Cell<TData, RowData>[],
  rowActionsEnabled?: boolean,
) {
  return (
    cells
      .map((cell, idx) =>
        cells.length === idx + 1
          ? `minmax(${cell.column.getSize()}px ,auto)`
          : `${cell.column.getSize()}px`,
      )
      .join(" ") + (rowActionsEnabled ? "min-content" : "")
  );
}

export function tableHeaderGridGenerator<TData>(
  headers: Header<TData, RowData>[],
) {
  return headers
    .map((header, idx) =>
      headers.length === idx + 1
        ? `minmax(${header.getSize()}px ,auto)`
        : `${header.getSize()}px`,
    )
    .join(" ");
}

export function getCellPinnedStyles<TData>({
  getIsPinned,
  getAfter,
  getStart,
}: Column<TData, RowData>): React.CSSProperties {
  const isPinned = getIsPinned();
  if (!isPinned) return {};

  const styles: React.CSSProperties = {
    backgroundColor: "inherit",
    position: "sticky",
    zIndex: 5,
  };

  if (isPinned === "left") {
    styles.left = getStart(isPinned);
    return styles;
  } else {
    styles.right = getAfter(isPinned);
    styles.borderLeftWidth = 1;
    styles.borderLeftStyle = "solid";
    styles.borderRightWidth = 0;
    return styles;
  }
}

export function calculateRowWidth<TData>(
  cells: Cell<TData, RowData>[],
  enableRowActions: boolean,
) {
  const rowWidth = cells.reduce((acc, cell) => acc + cell.column.getSize(), 0);
  if (enableRowActions) {
    return rowWidth + 112 /* max width for row actions */;
  }
  return rowWidth;
}
