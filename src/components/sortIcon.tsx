import { Column } from "@tanstack/react-table";
import { Icon } from "./icon";
import { SortIconBase } from "./sortIconBase";

export function getSortIcon<TData>(column: Column<TData, unknown>) {
  const colSortIndex = column.getSortIndex();
  const colSortDir = column.getIsSorted();

  if (!colSortDir)
    return (
      <Icon
        icon={"sort-asc"}
        className="!h-3 !w-8 flex-shrink-0 fill-black-70"
      />
    );
  return SortIconBase({ sortDirection: colSortDir, index: colSortIndex });
}
