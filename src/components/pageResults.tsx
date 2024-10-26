import { Table } from "@tanstack/react-table";
import clsx from "clsx";
import { useMemo } from "react";

type Props<TData> = {
  table: Table<TData>;
  className?: string;
};

export function PageResults<TData>({ table, className }: Props<TData>) {
  const {
    pagination: { pageIndex, pageSize } = { pageIndex: 0, pageSize: 0 },
  } = table.getState();
  const showPagination = table.getShowPagination();
  const totalItems = table.getRowCount();
  const label = useMemo(
    () =>
      showPagination
        ? getPaginationLabel(totalItems, pageIndex, pageSize)
        : `${totalItems.toLocaleString()} results`,
    [totalItems, pageIndex, pageSize, showPagination],
  );

  return (
    <span
      role="status"
      aria-live="polite"
      className={clsx(
        "text-nowrap text-table-base leading-normal text-black-100 dark:text-black-10",
        className,
      )}
    >
      {label}
    </span>
  );
}

function getPaginationLabel(
  total: number,
  pageIndex: number,
  pageSize: number,
): string {
  const start = pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, total);
  return `${start}-${end} of ${total.toLocaleString()} results`;
}
