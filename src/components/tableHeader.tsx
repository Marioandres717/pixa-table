import { Table, flexRender } from "@tanstack/react-table";
import { gridGenerator } from "../utils";
import ColumnResize from "./columnResize";
import ColumnSort from "./columnSort";

import styles from "./tableHeader.module.css";

type Props<T> = {
  tableInstance: Table<T>;
};

export default function TableHeader<T>({ tableInstance }: Props<T>) {
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
              className={styles.th}
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
            >
              <ColumnSort header={header}>
                <span className={styles.ellipsis}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </span>
              </ColumnSort>
              {header.column.getCanResize() && <ColumnResize header={header} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
