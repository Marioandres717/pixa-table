import { Table } from "@tanstack/react-table";

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
