import { VirtualizedColumnOrdering } from "./virtualizedColumnOrdering";
import { Table } from "@tanstack/react-table";
import { PageSize as DefaultPageSize } from "./pageSize";
import clsx from "clsx";

type Props<TData> = { table: Table<TData>; className?: string };

export function TableSettings<TData>({ table, className }: Props<TData>) {
  const PageSizeComponent = table.getPageSizeComponent() || DefaultPageSize;
  const showPagination = table.getShowPagination();

  return (
    <div
      data-testid="table-settings"
      role="dialog"
      className={clsx(
        "max-h-[500px] w-64 rounded p-4 drop-shadow-lg bg-surface text b dark:bg-surface-elevated",
        className,
      )}
    >
      <div className="mb-2 font-semibold">Table Settings</div>
      <div className="mb-2">Column order & visibility</div>
      <VirtualizedColumnOrdering table={table} />
      {showPagination && (
        <div className="mt-4 flex max-w-fit flex-col gap-1">
          <span className="text">Results per page</span>
          <PageSizeComponent table={table} className="h-8 text-[15px]" />
        </div>
      )}
    </div>
  );
}
