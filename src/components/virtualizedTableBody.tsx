import { Row, Table, flexRender } from "@tanstack/react-table";
import React from "react";
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
  const cols = table.getVisibleFlatColumns();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 36,
    getScrollElement: () => parentRef.current,
    overscan: 5,
  });

  const colVirtualizer = useVirtualizer({
    count: cols.length,
    estimateSize: (i) => cols[i].getSize(),
    getScrollElement: () => parentRef.current,
    overscan: 5,
    horizontal: true,
  });

  const viRows = rowVirtualizer.getVirtualItems();
  const viCols = colVirtualizer.getVirtualItems();

  return (
    <div
      className="relative"
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: `${colVirtualizer.getTotalSize()}px`,
      }}
    >
      {viRows.map((viRow) => {
        const row = rows[viRow.index];

        return (
          <div
            role="row"
            className="absolute left-0 top-0 grid w-full border-b dark:border-black-92.5"
            key={viRow.key}
            data-index={viRow.index}
            {...{
              style: {
                height: `${viRow.size}px`,
                gridTemplateColumns: gridGenerator(table),
                transform: `translateY(${viRow.start}px)`,
              },
            }}
          >
            {row.getVisibleCells().map((cell, i) => {
              const {
                column: { columnDef },
                getContext,
              } = cell;
              const viCol = viCols[i];
              if (!viCol) return null;
              return (
                <div
                  role="cell"
                  className="absolute left-0 top-0 flex min-h-9 items-center overflow-hidden border-b border-r px-3 py-2 last:border-r-0 dark:border-black-92.5 dark:bg-black-100"
                  key={viCol.key}
                  data-index={viCol.index}
                  style={{
                    textAlign: columnDef.meta?.align,
                    padding: columnDef.meta?.padding,
                    width: `${viCol.size}px`,
                    transform: `translateX(${viCol.start}px)`,
                  }}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {flexRender(columnDef.cell, getContext())}
                  </span>
                </div>
              );
            })}

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
