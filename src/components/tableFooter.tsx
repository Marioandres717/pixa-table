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
        "flex h-11 items-center justify-end px-3 py-2 bg-surface b-t",
        className,
      )}
    >
      {(showPagination === "bottom" || showPagination === "both") && (
        <PaginationComponent table={table} />
      )}
    </div>
  );
}
