import { Table } from "@tanstack/react-table";

export function PageSize<T>({ table }: { table: Table<T> }) {
  return (
    <div className="flex max-w-fit flex-col gap-1">
      <span className="text-table-base dark:text-black-10">
        Results per page
      </span>
      <select
        className="h-8 min-w-24 cursor-pointer rounded-[3px] px-2 py-1 text-[15px] focus:ring-0 dark:border-black-80 dark:bg-[#25333C] dark:text-black-10"
        onChange={(e) => table.setPageSize(Number(e.target.value))}
        value={table.getState().pagination.pageSize}
      >
        {[10, 25, 50, 100, 250, 1000].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
