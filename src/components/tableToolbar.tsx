import { Table } from "@tanstack/react-table";
import { PageResults } from "./results";
import classNames from "classnames";

type Props<T> = {
  className?: string;
  tableInstance: Table<T>;
  paginationPageSizeComponent?: React.ComponentType<{ table: Table<T> }>;
};

export function TableToolbar<T>({
  className,
  tableInstance,
  // paginationPageSizeComponent,
}: Props<T>) {
  const totalItems = tableInstance.getRowCount();

  const areItemsSelected =
    tableInstance.getIsSomeRowsSelected() ||
    tableInstance.getIsAllRowsSelected();

  const numOfItemsSelected = Object.keys(
    tableInstance.getState().rowSelection,
  ).length;

  return (
    <div
      className={classNames(
        `flex h-11 items-center justify-between border-b p-2 px-3 dark:border-b-black-92.5 ${areItemsSelected ? "bg-blue-100 text-black-10" : "dark:bg-black-100"}`,
        className,
      )}
    >
      {areItemsSelected ? (
        <div className="flex items-center justify-between">
          <span className="dark:text-white-50 font-medium text-black-10">
            {numOfItemsSelected} {numOfItemsSelected > 1 ? "Items" : "Item"}{" "}
            Selected
          </span>
        </div>
      ) : (
        <PageResults totalItems={totalItems} approximateCount={false} />
      )}
    </div>
  );
}
