import { Table } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { Icon } from "./icon";
import { ColumnOrdering } from "./columnOrdering";

import styles from "./settingsDropdown.module.css";
import { useOnclickOutside } from "../hooks/useOnClickOutside";
import { useOnCloseEscape } from "../hooks/useOnCloseEscape";

type Props<T> = {
  tableInstance: Table<T>;
  paginationPageSizeComponent?: React.ComponentType<{ table: Table<T> }>;
};

export function SettingsDropdown<T>({
  tableInstance,
  paginationPageSizeComponent: PageSizeOptions = PageSizeComponent,
}: Props<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [toggleSettings, setToggleSettings] = useState(false);

  useOnclickOutside(dropdownRef, () => setToggleSettings(false));
  useOnCloseEscape(toggleSettings, () => setToggleSettings(false));

  function toggleSettingsHandler() {
    setToggleSettings(!toggleSettings);
  }

  return (
    <div ref={dropdownRef} className={styles["settings-dropdown-container"]}>
      <div
        role="button"
        tabIndex={0}
        className={`${styles["setting-dropdown-btn"]} ${
          toggleSettings ? styles["button-opened"] : ""
        }`}
        onClick={toggleSettingsHandler}
        onKeyDown={toggleSettingsHandler}
      >
        <Icon icon="settings" size={16} color="" className="fill-white" />
      </div>
      {toggleSettings && (
        <div className={styles.dropdown}>
          <span className={styles.title}>Table Settings</span>
          <div className={styles["column-ordering-setting"]}>
            <span className={styles.subtitle}>
              Column Position & Visibility
            </span>
            <div className={styles["content-list"]}>
              <ColumnOrdering tableInstance={tableInstance} />
            </div>
          </div>
          {PageSizeOptions && <PageSizeOptions table={tableInstance} />}
        </div>
      )}
    </div>
  );
}

export function PageSizeComponent<T>({ table }: { table: Table<T> }) {
  return (
    <div className={styles.option}>
      <span className={styles.subtitle}>Rows per page</span>
      <select
        onChange={(e) => table.setPageSize(Number(e.target.value))}
        value={table.getState().pagination.pageSize}
      >
        {[10, 25, 50, 100, 250].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
