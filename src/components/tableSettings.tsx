import { VirtualizedColumnOrdering } from "./virtualizedColumnOrdering";
import { Table } from "@tanstack/react-table";
import { PageSize as DefaultPageSize } from "./pageSize";
import clsx from "clsx";

type Props<TData> = { table: Table<TData>; className?: string };

export default function TableSettings<TData>({
  table,
  className,
}: Props<TData>) {
  const PageSizeComponent = table.getPageSize() || DefaultPageSize;

  return (
    <div
      className={clsx(
        "max-h-[500px] w-64 rounded border bg-black-5 p-4 dark:border-black-90 dark:bg-black-95 dark:drop-shadow-[0_7px_20px_0_rgba(13,22,26,0.15)]",
        className,
      )}
    >
      <div className="mb-2 font-semibold">Table Settings</div>
      <div>Column order & visibility</div>
      <VirtualizedColumnOrdering table={table} />
      <div className="mt-4">
        <PageSizeComponent table={table} />
      </div>
    </div>
  );
}
