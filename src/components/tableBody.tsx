import React from "react";
import { Row, Table, flexRender } from "@tanstack/react-table";

import styles from "../templates/anomali/index.module.css";
import { gridGenerator } from "../utils";

type Props<TData> = {
  tableInstance: Table<TData>;
  expandableRowComponent?: React.ComponentType<{ row: Row<TData> }>;
};

export function TableBody<TData>({
  tableInstance: table,
  expandableRowComponent: ExpandRow,
}: Props<TData>) {
  const rows = table.getRowModel().rows;

  return (
    <div className={styles.tbody}>
      {rows.map((row) => (
        <div
          key={row.id}
          className={
            styles.tr + (row.getIsSelected() ? ` ${styles["tr-selected"]}` : "")
          }
          style={{
            position: "static",
            gridTemplateColumns: gridGenerator(table),
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <div
              key={cell.column.id}
              style={{
                textAlign: cell.column.columnDef.meta?.align,
                padding: cell.column.columnDef.meta?.padding,
              }}
              className={`${styles.td} ${
                cell.column.id.match(/expander/i) ? styles["td-expander"] : ""
              } ${
                cell.column.id.match(/selection/i) ? styles["td-selection"] : ""
              }`}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
          {row.getIsExpanded() && ExpandRow && (
            <div className={styles["tr-expandable"]}>
              <ExpandRow row={row} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
