import React from "react";
import { Table, flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { gridGenerator } from "../../utils";
import { PageOptions } from "../../components/pagination";
import { HeaderSettings } from "../../components/headerSettings";
import { TableHeader } from "../../components/tableHeader";

import "../../index.css";
import styles from "./index.module.css";

type Props<T> = {
  tableInstance: Table<T>;
  theme: "light" | "dark";
};

export function TableAnomali<T>({
  tableInstance: table,
  theme = "light",
}: Props<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rows = table.getRowModel().rows;
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 40,
    getScrollElement: () => parentRef.current,
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
        <HeaderSettings tableInstance={table} />
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
                  <div className={styles.td} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
                {row.getIsExpanded() && <h1>EXPANDABLE ROW</h1>}
              </div>
            );
          })}
        </div>
        <div className={styles.tfooter}>
          <PageOptions tableInstance={table} />
        </div>
      </div>
    </div>
  );
}
