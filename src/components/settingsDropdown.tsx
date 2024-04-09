import { Table } from "@tanstack/react-table";
import "./settingsDropdown.css";
import Icon from "./icon";
import { useRef, useState } from "react";

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
    <div ref={dropdownRef} className="settingsDropdown">
      <div
        role="button"
        tabIndex={0}
        className={`settingsDropdownBtn ${
          toggleSettings ? "buttonOpened" : ""
        }`}
        onClick={toggleSettingsHandler}
        onKeyDown={toggleSettingsHandler}
      >
        <Icon icon="settings" color="var(--ml-text-color)" size={16} />
      </div>
      {toggleSettings && (
        <div className="dropdown">
          <span className="title">Table Settings</span>
          <div>
            <span className="subtitle">Column Position & Visibility</span>
            <div className="contentList">
              <div>DND COLUMNS POISTION</div>
            </div>
          </div>
          <div className="option">
            <span className="subtitle">Rows per page</span>
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
