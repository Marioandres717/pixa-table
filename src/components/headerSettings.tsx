import PageResults from "./results";
import { Table } from "@tanstack/react-table";
import SettingsDropdown from "./settingsDropdown";

import styles from "./headerSettings.module.css";

type Props<T> = {
  tableInstance: Table<T>;
};

export default function HeaderSettings<T>({ tableInstance }: Props<T>) {
  const totalItems = tableInstance.getRowCount();

  return (
    <div className={styles["settings-header"]}>
      <PageResults totalItems={totalItems} approximateCount={false} />
      <SettingsDropdown
        tableInstance={tableInstance}
        paginationPageOptions={[10, 25, 50, 100, 250]}
      />
    </div>
  );
}
