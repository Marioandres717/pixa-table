import { Table } from "@tanstack/react-table";
import { Pagination } from "./pagination";
import clsx from "clsx";

type Props<TData> = {
  table: Table<TData>;
  className?: string;
};

export function TableFooter<TData>({ table, className }: Props<TData>) {
  const PaginationComponent = table.getPaginationComponent() || Pagination;
  const showPagination = table.getShowPagination();

  return (
    <div
      className={clsx(
        "flex h-11 items-center justify-end border-t border-black-20 bg-black-10 px-3 py-2 dark:border-black-92.5 dark:bg-black-100",
        className,
      )}
    >
      {(showPagination === "bottom" || showPagination === "both") && (
        <PaginationComponent table={table} />
      )}
    </div>
  );
}
