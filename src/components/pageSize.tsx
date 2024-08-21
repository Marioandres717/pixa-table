import { Table } from "@tanstack/react-table";
import clsx from "clsx";

type Props<TData> = {
  table: Table<TData>;
  className?: string;
};

export function PageSize<TData>({ table, className }: Props<TData>) {
  return (
    <select
      role="listbox"
      className={clsx(
        "w-20 cursor-pointer rounded-[3px] px-2 py-1 focus:ring-0 dark:border-black-80 dark:bg-[#25333C] dark:text-black-10",
        className,
      )}
      onChange={(e) => table.setPageSize(Number(e.target.value))}
      value={table.getState().pagination.pageSize}
    >
      {[10, 25, 50, 100, 250, 1000].map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
