import { Table } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { Icon } from "./icon";
import { ColumnOrdering } from "./columnOrdering";

import styles from "./settingsDropdown.module.css";

type Props<T> = {
  tableInstance: Table<T>;
  paginationPageOptions: number[];
};

export default function SettingsDropdown<T>({
  tableInstance,
  paginationPageOptions: opts,
}: Props<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [toggleSettings, setToggleSettings] = useState(false);

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
        <Icon icon="settings" color="var(--ml-text-color)" size={16} />
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
          <div className={styles.option}>
            <span className={styles.subtitle}>Rows per page</span>
            <select
              onChange={(e) =>
                tableInstance.setPageSize(Number(e.target.value))
              }
              value={tableInstance.getState().pagination.pageSize}
            >
              {opts.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
