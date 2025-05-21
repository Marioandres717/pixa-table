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
        `flex h-11 items-center justify-between bg-surface-overlay p-2 px-3 b-b dark:bg-surface`,
        {
          "!bg-interaction-accent": areItemsSelected,
        },
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
