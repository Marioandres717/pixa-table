import { VirtualizedColumnOrdering } from "./virtualizedColumnOrdering";
import { Table } from "@tanstack/react-table";
import { PageSize as DefaultPageSize } from "./pageSize";
import clsx from "clsx";

type Props<TData> = { table: Table<TData>; className?: string };

export default function TableSettings<TData>({
  table,
  className,
}: Props<TData>) {
  const PageSizeComponent = table.getPageSizeComponent() || DefaultPageSize;
  const showPagination = table.getShowPagination();

  return (
    <div
      className={clsx(
        "max-h-[500px] w-64 rounded border bg-black-5 p-4 text-table-base text-black-100 dark:border-black-90 dark:bg-black-95 dark:text-black-10 dark:drop-shadow-[0_7px_20px_0_rgba(13,22,26,0.15)]",
        className,
      )}
    >
      <div className="mb-2 font-semibold">Table Settings</div>
      <div className="mb-2">Column order & visibility</div>
      <VirtualizedColumnOrdering table={table} />
      {showPagination && (
        <div className="mt-4 flex max-w-fit flex-col gap-1">
          <span className="text-table-base text-black-100 dark:text-black-10">
            Results per page
          </span>
          <PageSizeComponent table={table} className="h-8 text-[15px]" />
        </div>
      )}
    </div>
  );
}
