import { Header } from "@tanstack/react-table";
import { PropsWithChildren } from "react";

import { Icon } from "./icon";
import { getSortIcon } from "./sortIcon";

type Props<TData> = PropsWithChildren<{
  header: Header<TData, unknown>;
  multiSort?: boolean;
}>;

export function ColumnSort<TData>({
  header,
  children,
  multiSort,
}: Props<TData>) {
  const { column } = header;
  const { columnDef } = column;

  const sortDirection = column.getIsSorted();

  return (
    <div
      className="flex cursor-pointer items-center"
      title={columnDef.header?.toString()}
      onClick={header.column.getToggleSortingHandler()}
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </span>
      {column.getCanSort() && (
        <>
          {multiSort && getSortIcon(column)}

          {!multiSort && (
            <Icon
              icon={sortDirection ? `sort-${sortDirection}` : "sort-asc"}
              className={`!h-3 !w-8 flex-shrink-0 ${column.getIsSorted() ? "fill-aqua-100" : ""}`}
            />
          )}
        </>
      )}
    </div>
  );
}
