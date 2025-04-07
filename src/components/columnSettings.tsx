import { Table } from "@tanstack/react-table";
import { TableSettings } from "./tableSettings";

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
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        tabIndex={-1}
        role="tab"
        className={`h-full max-h-36 w-full cursor-pointer border-black-20 dark:border-black-92.5 ${show ? "border-b dark:bg-black-140" : ""}`}
      >
        <div className="rotate-90">Columns</div>
      </button>
      {show && (
        <TableSettings
          table={table}
          className="absolute left-0 top-0 z-50 -translate-x-64"
        />
      )}
    </>
  );
}
