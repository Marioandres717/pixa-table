import { PageResults } from "./results";
import { Table } from "@tanstack/react-table";
import SettingsDropdown from "./settingsDropdown";

import styles from "./headerSettings.module.css";

type Props<T> = {
  tableInstance: Table<T>;
  paginationPageSizeComponent?: React.ComponentType<{ table: Table<T> }>;
};

export function HeaderSettings<T>({
  tableInstance,
  paginationPageSizeComponent,
}: Props<T>) {
  const totalItems = tableInstance.getRowCount();

  return (
    <div className={styles["settings-header"]}>
      <PageResults totalItems={totalItems} approximateCount={false} />
      <SettingsDropdown
        tableInstance={tableInstance}
        paginationPageSizeComponent={paginationPageSizeComponent}
      />
    </div>
  );
}
