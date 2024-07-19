import { Table } from "@tanstack/react-table";
import { PageResults } from "./results";
import { SettingsDropdown } from "./settingsDropdown";

type Props<T> = {
  tableInstance: Table<T>;
  paginationPageSizeComponent?: React.ComponentType<{ table: Table<T> }>;
};

export function TableToolbar<T>({
  tableInstance,
  paginationPageSizeComponent,
}: Props<T>) {
  const totalItems = tableInstance.getRowCount();

  return (
    <div className="flex h-11 flex-shrink-0 items-center justify-between border-b p-2 px-3 dark:border-b-black-92.5 dark:bg-black-100">
      <PageResults totalItems={totalItems} approximateCount={false} />
      <SettingsDropdown
        tableInstance={tableInstance}
        paginationPageSizeComponent={paginationPageSizeComponent}
      />
    </div>
  );
}
