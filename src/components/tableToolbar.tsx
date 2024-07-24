import { Table } from "@tanstack/react-table";
import { PageResults } from "./results";
import { SettingsDropdown } from "./settingsDropdown";
import { useMemo } from "react";

type Props<T> = {
  tableInstance: Table<T>;
  paginationPageSizeComponent?: React.ComponentType<{ table: Table<T> }>;
};

export function TableToolbar<T>({
  tableInstance,
  paginationPageSizeComponent,
}: Props<T>) {
  const totalItems = useMemo(
    () => tableInstance.getRowCount(),
    [tableInstance],
  );
  const areItemsSelected =
    tableInstance.getIsSomeRowsSelected() ||
    tableInstance.getIsAllRowsSelected();
  const numOfItemsSelected = useMemo(
    () => Object.keys(tableInstance.getState().rowSelection).length,
    [tableInstance],
  );
  return (
    <div
      className={`flex h-11 flex-shrink-0 items-center justify-between border-b p-2 px-3 dark:border-b-black-92.5 dark:bg-black-100 ${areItemsSelected ? "!bg-blue-100 text-black-10" : ""}`}
    >
      {areItemsSelected ? (
        <div className="flex items-center justify-between">
          <span className="dark:text-white-50 font-medium text-black-10">
            {numOfItemsSelected} {numOfItemsSelected > 1 ? "Items" : "Item"}{" "}
            Selected
          </span>
        </div>
      ) : (
        <>
          <PageResults totalItems={totalItems} approximateCount={false} />
          <SettingsDropdown
            tableInstance={tableInstance}
            paginationPageSizeComponent={paginationPageSizeComponent}
          />
        </>
      )}
    </div>
  );
}
