import React from "react";
import { Header, Row, Table, flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import { gridGenerator } from "../../utils";
import { PageOptions, HeaderSettings, TableHeader } from "../../components";

import "../../index.css";
import styles from "./index.module.css";

type Props<TData> = {
  tableInstance: Table<TData>;
  width?: number;
  height?: number;
  theme: "light" | "dark";
  hideHeader?: boolean;
  expandableRowComponent?: React.ComponentType<{ row: Row<TData> }>;
  pageSizeComponent?: React.ComponentType<{ table: Table<TData> }>;
  paginationComponent?: React.ComponentType<{ table: Table<TData> }>;
  filterColumnComponent?: React.ComponentType<{
    header: Header<TData, unknown>;
  }>;
};

export function TableAnomali<TData>({
  tableInstance: table,
  width,
  height,
  theme = "light",
  hideHeader = false,
  expandableRowComponent: ExpandRow,
  pageSizeComponent,
  paginationComponent: PageOptionsComponent = PageOptions,
  filterColumnComponent,
}: Props<TData>) {
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
  const headerHeight = hideHeader ? 0 : 41 + 36;

  return (
    <div
      data-pixa-theme={theme}
      ref={parentRef}
      className={styles["table-container"]}
      style={{
        width: width || "100%",
        overflow: "hidden",
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
          className: styles.table,
        }}
      >
        {!hideHeader && (
          <TableHeader
            tableInstance={table}
            filterColumnComponent={filterColumnComponent}
          />
        )}
        <div
          className={styles.tbody}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            maxHeight: hideHeader ? height : height && height - headerHeight,
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
      </div>
      <div className={styles.tfooter}>
        <PageOptionsComponent table={table} />
      </div>
    </div>
  );
}
