import { ColumnMeta, Header } from "@tanstack/react-table";
import { PropsWithChildren } from "react";

import styles from "./columnSort.module.css";

type Props<TData> = PropsWithChildren<{
  header: Header<TData, unknown>;
}>;

export function ColumnSort<TData>({ header, children }: Props<TData>) {
  const { column } = header;
  const { columnDef } = column;
  const { meta } = columnDef;

  const sortDirection = column.getIsSorted();
  const align = getColumnAlignment(meta);

  return (
    <div
      className={styles["sort-content"]}
      style={{
        justifyContent: align,
      }}
      title={columnDef.id}
    >
      {children}
      {column.getCanSort() && (
        <span className={styles["sort-icons-wrapper"]}>
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

function getColumnAlignment<TData>(column?: ColumnMeta<TData, unknown>) {
  const align = column?.align;
  if (!align) return "flex-start";
  switch (align) {
    case "left":
      return "flex-start";
    case "right":
      return "flex-end";
    case "center":
      return "center";
    default:
      return "flex-start";
  }
}
