import { Header } from "@tanstack/react-table";
import { PropsWithChildren } from "react";

import styles from "./columnSort.module.css";

type Props<T> = PropsWithChildren<{
  header: Header<T, unknown>;
}>;

export function ColumnSort<T>({ header, children }: Props<T>) {
  const { column } = header;
  const sortDirection = column.getIsSorted();

  return (
    <div className={styles["sort-content"]} title={column.columnDef.id}>
      {children}
      {column.getCanSort() && (
        <span>
          <span
            className={
              sortDirection === "asc"
                ? `${styles["arrow-up"]} ${styles.selected}`
                : styles["arrow-up"]
            }
          ></span>
          <span
            className={
              sortDirection === "desc"
                ? `${styles["arrow-down"]} ${styles.selected}`
                : styles["arrow-down"]
            }
          ></span>
        </span>
      )}
    </div>
  );
}
