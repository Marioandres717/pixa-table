import { Header } from "@tanstack/react-table";
import { PropsWithChildren } from "react";

import styles from "./columnSort.module.css";
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
      className={styles["sort-content"]}
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
              color={column.getIsSorted() ? "" : "var(--ml-gray-400)"}
              className={styles["sort-icon"]}
            />
          )}
        </>
      )}
    </div>
  );
}
