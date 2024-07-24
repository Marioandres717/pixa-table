import { Column, Table } from "@tanstack/react-table";
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
): VirtualItem[] {
  const extraSpace = parentWidth - colVirtualizer.getTotalSize();
  if (extraSpace <= 0) return colVirtualizer.getVirtualItems();
  let numberOfDisplayCols = 0;
  return colVirtualizer.getVirtualItems().reduce((acc, viCol, i) => {
    const { index, size } = viCol;
    const col = cols[index];
    if (col.id === "selection" || col.id === "expander") {
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
  }, [] as VirtualItem[]);
}
