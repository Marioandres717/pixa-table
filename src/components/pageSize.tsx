import { Table } from "@tanstack/react-table";

export function PageSize<T>({ table }: { table: Table<T> }) {
  return (
    <div className="">
      <span className="">Rows per page</span>
      <select
        onChange={(e) => table.setPageSize(Number(e.target.value))}
        value={table.getState().pagination.pageSize}
      >
        {[10, 25, 50, 100, 250].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
