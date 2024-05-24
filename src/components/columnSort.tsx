import { ColumnMeta, Header } from "@tanstack/react-table";
import { PropsWithChildren } from "react";

import styles from "./columnSort.module.css";
import { Icon } from "./icon";

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
      title={columnDef.id}
      onClick={header.column.getToggleSortingHandler()}
    >
      <span className={styles.ellipsis} style={align}>
        {children}
      </span>
      {column.getCanSort() &&
        (sortDirection === "asc" ? (
          <Icon icon="sort-asc" color="#5FEAD9" size={12} />
        ) : sortDirection === "desc" ? (
          <Icon icon="sort-desc" color="#5FEAD9" size={12} />
        ) : (
          <Icon icon="sort-asc" color="var(--ml-gray-400)" size={12} />
        ))}
    </div>
  );
}

function getColumnAlignment<TData>(column?: ColumnMeta<TData, unknown>) {
  const align = column?.align;
  const defaultMargin = { margin: "0 0 0 0" };

  if (!align) return defaultMargin;

  switch (align) {
    case "left":
      return defaultMargin;
    case "right":
      return { margin: "0 0 0 auto" };
    case "center":
      return { margin: "0 auto" };
    default:
      return defaultMargin;
  }
}
