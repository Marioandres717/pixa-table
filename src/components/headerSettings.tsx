import PageResults from "./results";
import "./headerSettings.css";
import SettingsDropdown from "./settingsDropdown";
import { Table } from "@tanstack/react-table";

type Props<T> = {
  tableInstance: Table<T>;
};

export default function HeaderSettings<T>({ tableInstance }: Props<T>) {
  const totalItems = tableInstance.getRowCount();

  return (
    <div className="settingsHeader">
      <PageResults totalItems={totalItems} approximateCount={false} />
      <SettingsDropdown
        tableInstance={tableInstance}
        paginationPageOptions={[10, 25, 50, 100, 250]}
      />
    </div>
  );
}
