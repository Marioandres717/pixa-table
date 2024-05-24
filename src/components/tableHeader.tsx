import { Table, flexRender, Header } from "@tanstack/react-table";
import { gridGenerator } from "../utils";
import { ColumnResize } from "./columnResize";
import { ColumnSort } from "./columnSort";

import styles from "./tableHeader.module.css";
import ColumnFilter from "./columnFilter";

type Props<TData> = {
  tableInstance: Table<TData>;
  filterColumnComponent?: React.ComponentType<{
    header: Header<TData, unknown>;
  }>;
};

export function TableHeader<TData>({
  tableInstance,
  filterColumnComponent: Filter = ColumnFilter,
}: Props<TData>) {
  const headerGroups = tableInstance.getHeaderGroups();

  return (
    <div className={styles.thead}>
      {headerGroups.map((headerGroup) => (
        <div
          {...{
            key: headerGroup.id,
            className: styles.tr,
            style: {
              gridTemplateColumns: gridGenerator(tableInstance),
            },
          }}
        >
          {headerGroup.headers.map((header) => (
            <div
              className={`${styles.th} ${header.id.match(/expander/i) ? styles["th-expander"] : ""} ${header.id.match(/selection/i) ? styles["th-selection"] : ""}`}
              key={header.id}
              style={{
                justifyContent: header.column.columnDef.meta?.align,
              }}
            >
              <ColumnSort header={header}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </ColumnSort>
              <div className={styles["filter-wrapper"]}>
                {header.column.getCanFilter() && <Filter header={header} />}
              </div>
              {header.column.getCanResize() && <ColumnResize header={header} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
