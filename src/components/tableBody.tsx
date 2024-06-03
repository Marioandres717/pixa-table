import React from "react";
import { Cell, Row, Table, flexRender } from "@tanstack/react-table";

import styles from "../templates/anomali/index.module.css";
import { gridGenerator } from "../utils";

type Props<TData> = {
  tableInstance: Table<TData>;
  expandableRowComponent?: React.ComponentType<{ row: Row<TData> }>;
  disableRowHover?: boolean;
};

export function TableBody<TData>({
  tableInstance: table,
  expandableRowComponent: ExpandRow,
  disableRowHover,
}: Props<TData>) {
  const rows = table.getRowModel().rows;

  function getCellClassNames<TData>(cell: Cell<TData, unknown>) {
    let classNames = styles.td;
    if (cell.column.id.match(/expander/i)) {
      classNames += ` ${styles["td-expander"]}`;
    }
    if (cell.column.id.match(/selection/i)) {
      classNames += ` ${styles["td-selection"]}`;
    }
    return classNames;
  }

  if (rows.length === 0) {
    return (
      <div className={styles["tbody-no-data"]}>
        <div className={styles["no-data"]}>No Results</div>
      </div>
    );
  }

  return (
    <div className={styles.tbody}>
      {rows.map((row) => {
        const rowClassNames = `${styles.tr} ${
          row.getIsSelected() ? styles["tr-selected"] : ""
        } ${disableRowHover ? styles["tr-disable-hover"] : ""}`;

        return (
          <div
            key={row.id}
            className={rowClassNames}
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
                className={getCellClassNames(cell)}
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
        );
      })}
    </div>
  );
}
