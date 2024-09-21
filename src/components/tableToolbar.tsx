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
        `flex h-11 items-center justify-between rounded-t-[4px] border-b border-b-black-20 bg-black-10 p-2 px-3 dark:border-b-black-92.5 dark:bg-black-100`,
        { "bg-blue-120 text-black-10 dark:bg-blue-100": areItemsSelected },
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
