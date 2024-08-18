import { Table } from "@tanstack/react-table";
import { VirtualizedColumnOrdering } from "./virtualizedColumnOrdering";
import { PageSize as DefaultPageSize } from "./pageSize";

type Props<TData> = {
  show: boolean;
  table: Table<TData>;
  onClick: () => void;
};

export default function ColumnSettings<TData>({
  show = false,
  onClick,
  table,
}: Props<TData>) {
  const PageSizeComponent =
    table.getPluggableComponents().PageSize || DefaultPageSize;

  return (
    <>
      <button
        onClick={onClick}
        type="button"
        tabIndex={-1}
        role="tab"
        className={`h-full max-h-36 w-full cursor-pointer dark:border-black-92.5 ${show ? "border-b dark:bg-black-140" : ""}`}
      >
        <div className="rotate-90">Columns</div>
      </button>
      {show && (
        <div
          className={`absolute left-0 top-0 z-20 max-h-[500px] w-64 -translate-x-64 rounded border bg-black-5 p-4 dark:border-black-90 dark:bg-black-95 dark:drop-shadow-[0_7px_20px_0_rgba(13,22,26,0.15)]`}
        >
          <div className="mb-2 font-semibold">Table Settings</div>
          <div>Column order & visibility</div>
          <VirtualizedColumnOrdering table={table} />
          <div className="mt-4">
            <PageSizeComponent table={table} />
          </div>
        </div>
      )}
    </>
  );
}
