import { Column, RowData, Table } from "@tanstack/react-table";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

export const gridGenerator = <TData>(table: Table<TData>) => {
  const visibleColumns = table.getVisibleFlatColumns();
  return visibleColumns
    .map((i, idx) =>
      visibleColumns.length === idx + 1
        ? `minmax(${i.getSize()}px ,auto)`
        : `${i.getSize()}px`,
    )
    .join(" ");
};

export function calculateViCols<TData>(
  cols: Column<TData, unknown>[],
  parentWidth: number,
  colVirtualizer: Virtualizer<HTMLDivElement, Element>,
): VirtualItem<Element>[] {
  const extraSpace = parentWidth - colVirtualizer.getTotalSize();
  if (extraSpace <= 0) return colVirtualizer.getVirtualItems();
  let numberOfDisplayCols = 0;
  return colVirtualizer.getVirtualItems().reduce((acc, viCol, i) => {
    const { index, size } = viCol;
    const col = cols[index];
    if (col.getIsPinned()) {
      acc.push(viCol);
      numberOfDisplayCols++;
    } else {
      const prevColEnd = acc[i - 1]?.end ?? 0;
      acc.push({
        ...viCol,
        start: prevColEnd,
        size: size + extraSpace / (cols.length - numberOfDisplayCols),
        end:
          prevColEnd + size + extraSpace / (cols.length - numberOfDisplayCols),
      });
    }
    return acc;
  }, [] as VirtualItem<Element>[]);
}

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
