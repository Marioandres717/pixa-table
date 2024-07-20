import { Row, Table, flexRender } from "@tanstack/react-table";
import React, { useEffect } from "react";
import styles from "../templates/anomali/index.module.css";
import { useVirtualizer } from "@tanstack/react-virtual";
import { gridGenerator } from "../utils";

type Props<TData> = {
  tableInstance: Table<TData>;
  parentRef: React.RefObject<HTMLDivElement>;
  expandableRowComponent?: React.ComponentType<{ row: Row<TData> }>;
  disableRowHover?: boolean;
};

export function VirtualizedTableBody<TData>({
  tableInstance: table,
  parentRef,
  expandableRowComponent: ExpandRow,
  // disableRowHover,
}: Props<TData>) {
  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 36,
    getScrollElement: () => parentRef.current,
    overscan: 5,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [rows, rowVirtualizer]);

  const viRows = rowVirtualizer.getVirtualItems();

  return (
    <div
      className="relative"
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
      }}
    >
      {viRows.map((virtualItem) => {
        const row = rows[virtualItem.index];
        return (
          <div
            role="row"
            className="absolute left-0 top-0 grid w-full"
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={(node) => rowVirtualizer.measureElement(node)}
            {...{
              style: {
                height: `${virtualItem.size}px`,
                gridTemplateColumns: gridGenerator(table),
                transform: `translateY(${virtualItem.start}px)`,
              },
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <div
                role="cell"
                className="flex min-h-9 items-center overflow-hidden border-b border-r px-3 py-2 last:border-r-0 dark:border-black-92.5 dark:bg-black-100"
                style={{
                  textAlign: cell.column.columnDef.meta?.align,
                  padding: cell.column.columnDef.meta?.padding,
                }}
                key={cell.id}
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
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
