import React from "react";
import { Row, Table, flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import { gridGenerator } from "../../utils";
import { PageOptions, HeaderSettings, TableHeader } from "../../components";

import "../../index.css";
import styles from "./index.module.css";

type Props<T> = {
  tableInstance: Table<T>;
  width?: string;
  heigth?: string;
  theme: "light" | "dark";
  hideHeader?: boolean;
  expandableRowComponent?: React.ComponentType<{ row: Row<T> }>;
  pageSizeComponent?: React.ComponentType<{ table: Table<T> }>;
  paginationComponent?: React.ComponentType<{ table: Table<T> }>;
};

export function TableAnomali<T>({
  tableInstance: table,
  width,
  heigth,
  theme = "light",
  hideHeader = false,
  expandableRowComponent: ExpandRow,
  pageSizeComponent,
  paginationComponent: PageOptionsComponent = PageOptions,
}: Props<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);
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
  const viRows = rowVirtualizer.getVirtualItems();
  // const headerHeight = hideHeader ? 0 : 41 + 36;

  return (
    <div
      data-pixa-theme={theme}
      ref={parentRef}
      className={styles["table-container"]}
      style={{
        width: width || "100%",
        height: heigth || "100%",
      }}
    >
      {!hideHeader && (
        <div className={styles["header-settings"]}>
          <HeaderSettings
            tableInstance={table}
            paginationPageSizeComponent={pageSizeComponent}
          />
        </div>
      )}
      <div
        {...{
          className: styles["table"],
        }}
      >
        {!hideHeader && <TableHeader tableInstance={table} />}
        <div
          className={styles.tbody}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {viRows.map((virtualItem) => {
            const row = rows[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={(node) => rowVirtualizer.measureElement(node)}
                {...{
                  className:
                    styles.tr +
                    (row.getIsSelected() ? ` ${styles["tr-selected"]}` : ""),
                  style: {
                    gridTemplateColumns: gridGenerator(table),
                    transform: `translateY(${virtualItem.start}px)`,
                  },
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    className={`${styles.td} ${cell.column.id.match(/expander/i) ? styles["td-expander"] : ""} ${cell.column.id.match(/selection/i) ? styles["td-selection"] : ""}`}
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
        <div className={styles.tfooter}>
          <PageOptionsComponent table={table} />
        </div>
      </div>
    </div>
  );
}
