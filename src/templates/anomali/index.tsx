import React from "react";
import { Row, Table, flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import { gridGenerator } from "../../utils";
import { PageOptions, HeaderSettings, TableHeader } from "../../components";

import "../../index.css";
import styles from "./index.module.css";

type Props<T> = {
  tableInstance: Table<T>;
  theme: "light" | "dark";
  expandableRowComponent?: React.ComponentType<{ row: Row<T> }>;
  pageSizeComponent?: React.ComponentType<{ table: Table<T> }>;
  paginationComponent?: React.ComponentType<{ table: Table<T> }>;
};

export function TableAnomali<T>({
  tableInstance: table,
  theme = "light",
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

  return (
    <div
      data-pixa-theme={theme}
      ref={parentRef}
      className={styles["table-container"]}
    >
      <div className={styles["header-settings"]}>
        <HeaderSettings
          tableInstance={table}
          paginationPageSizeComponent={pageSizeComponent}
        />
      </div>
      <div
        {...{
          className: styles["table"],
        }}
      >
        <TableHeader tableInstance={table} />

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
                  className: styles.tr,
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
                {table.getCanSomeRowsExpand() && (
                  <div>
                    {row.getIsExpanded() && ExpandRow && (
                      <ExpandRow row={row} />
                    )}
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
