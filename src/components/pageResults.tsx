import { Table } from "@tanstack/react-table";
import clsx from "clsx";
import { useMemo } from "react";

type Props<TData> = {
  table: Table<TData>;
  className?: string;
};

export function PageResults<TData>({ table, className }: Props<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalItems = table.getRowCount();
  const label = useMemo(
    () => getPaginationLabel(totalItems, pageIndex, pageSize),
    [totalItems, pageIndex, pageSize],
  );

  return (
    <span
      role="status"
      aria-live="polite"
      className={clsx(
        "text-nowrap text-table-base font-medium leading-normal text-black-100 dark:text-black-10",
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
  return `${start}-${end} of ${total} results`;
}
