import { Table } from "@tanstack/react-table";
import { PageResults } from "./results";
import clsx from "clsx";
import { SettingsDropdown } from "./settingsDropdown";

type Props<TData> = {
  className?: string;
  table: Table<TData>;
};

export function TableToolbar<TData>({ className, table }: Props<TData>) {
  const totalItems = table.getRowCount();

  const areItemsSelected =
    table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

  const numOfItemsSelected = Object.keys(table.getState().rowSelection).length;

  const actions = table.getSelectionActions();

  return (
    <div
      role="toolbar"
      className={clsx(
        `flex h-11 items-center justify-between rounded-t-[4px] border-b p-2 px-3 dark:border-b-black-92.5 ${areItemsSelected ? "bg-blue-100 text-black-10" : "bg-black-5 dark:bg-black-100"}`,
        className,
      )}
    >
      <div className="flex w-full items-center justify-between">
        {areItemsSelected ? (
          <>
            <span className="dark:text-white-50 font-medium text-black-10">
              {numOfItemsSelected} {numOfItemsSelected > 1 ? "Items" : "Item"}{" "}
              Selected
            </span>

            <div className="flex items-center gap-2">
              {actions.map((action) => {
                const isActionHidden =
                  typeof action.isHidden === "function"
                    ? action.isHidden(table.getSelectedRowModel().rows)
                    : action.isHidden || false;

                return (
                  <button
                    key={action.type}
                    className="rounded bg-transparent py-1 capitalize text-white"
                    style={{
                      display: isActionHidden ? "none" : "inherit",
                    }}
                    onClick={() =>
                      table.onSelectionAction(
                        action,
                        table.getSelectedRowModel().rows,
                      )
                    }
                  >
                    {action.type}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <PageResults totalItems={totalItems} approximateCount={false} />
            <SettingsDropdown table={table} />
          </>
        )}
      </div>
    </div>
  );
}
