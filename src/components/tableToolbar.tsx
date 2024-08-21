import { Table } from "@tanstack/react-table";
import clsx from "clsx";
import { DefaultToolbar } from "./defaultToolbar";
import { SelectedItemsToolbar } from "./selectedItemsToolbar";

type Props<TData> = {
  className?: string;
  table: Table<TData>;
};

export function TableToolbar<TData>({ className, table }: Props<TData>) {
  const areItemsSelected =
    table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

  return (
    <div
      role="toolbar"
      className={clsx(
        `flex h-11 items-center justify-between rounded-t-[4px] border-b p-2 px-3 dark:border-b-black-92.5 ${areItemsSelected ? "bg-blue-100 text-black-10" : "bg-black-5 dark:bg-black-100"}`,
        className,
      )}
    >
      {areItemsSelected ? (
        <SelectedItemsToolbar table={table} />
      ) : (
        <DefaultToolbar table={table} />
      )}
    </div>
  );
}
