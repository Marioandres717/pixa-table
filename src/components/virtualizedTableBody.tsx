import { Cell, Row, Table, flexRender } from "@tanstack/react-table";
import React, { useEffect } from "react";
import styles from "../templates/anomali/index.module.css";
import { gridGenerator } from "../utils";
import { useVirtualizer } from "@tanstack/react-virtual";

type Props<TData> = {
  tableInstance: Table<TData>;
  parentRef: React.RefObject<HTMLDivElement>;
  expandableRowComponent?: React.ComponentType<{ row: Row<TData> }>;
};

export function VirtualizedTableBody<TData>({
  tableInstance: table,
  parentRef,
  expandableRowComponent: ExpandRow,
}: Props<TData>) {
  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 40,
    getScrollElement: () => parentRef.current,
    overscan: 5,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [rows, rowVirtualizer]);

  const viRows = rowVirtualizer.getVirtualItems();

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

  return (
    <div
      className={styles.tbody}
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
      }}
    >
      {viRows.map((virtualItem) => {
        const row = rows[virtualItem.index];
        const rowClassNames = `${styles.tr} ${
          row.getIsSelected() ? styles["tr-selected"] : ""
        }`;

        return (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={(node) => rowVirtualizer.measureElement(node)}
            {...{
              className: rowClassNames,
              style: {
                gridTemplateColumns: gridGenerator(table),
                transform: `translateY(${virtualItem.start}px)`,
              },
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <div
                className={getCellClassNames(cell)}
                style={{
                  textAlign: cell.column.columnDef.meta?.align,
                  padding: cell.column.columnDef.meta?.padding,
                }}
                key={cell.id}
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
