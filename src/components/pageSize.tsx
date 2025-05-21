import { Table } from "@tanstack/react-table";
import clsx from "clsx";

type Props<TData> = {
  table: Table<TData>;
  pageOptions?: number[];
  className?: string;
};

export function PageSize<TData>({
  table,
  className,
  pageOptions = [10, 25, 50, 100, 250, 500, 1000],
}: Props<TData>) {
  return (
    <select
      role="listbox"
      className={clsx(
        "w-20 cursor-pointer rounded-[3px] px-2 py-1 focus:ring-0 dark:bg-surface-elevated dark:b-strong",
        className,
      )}
      onChange={(e) => table.setPageSize(Number(e.target.value))}
      value={table.getState().pagination.pageSize}
    >
      {pageOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
