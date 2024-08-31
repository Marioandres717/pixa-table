import { Row, RowData, Table } from "@tanstack/react-table";
import clsx from "clsx";

type Props<TData> = {
  table?: Table<TData>;
  row: Row<RowData>;
  className?: string;
};

export default function RowActions<TData>({ className }: Props<TData>) {
  return (
    <div
      role="group"
      className={clsx("flex h-9 max-w-fit gap-1 dark:bg-black-95", className)}
    >
      <button>View</button>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}
