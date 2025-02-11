import clsx from "clsx";
import { Column, Row, RowData, Table } from "@tanstack/react-table";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { VirtualizedRowCell } from "./virtualizedRowCell";
import RowActions from "./rowActions";
import { getPinnedCols } from "../utils";
import { useMemo } from "react";

type Props<TData> = {
  row: Row<TData>;
  viRow: VirtualItem;
  cols: Column<TData, RowData>[];
  rowWidth: number;
  table: Table<TData>;
  colVirtualizer: Virtualizer<HTMLDivElement, Element>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
};

export function VirtualizedFixedHeightRow<TData>({
  cols,
  row,
  viRow,
  rowWidth,
  table,
  colVirtualizer,
  rowVirtualizer,
}: Props<TData>) {
  const { left, right } = useMemo(() => getPinnedCols(cols), [cols]);
  const rowActions = row.getRowActions();
  const viCols = colVirtualizer.getVirtualItems();
  const ExpandableRow = row.getExpandableRowComponent();
  const { rowHeight = 36 } = table.getLayout();
  const cellHeight = rowHeight === "dynamic" ? 36 : rowHeight;

  return (
    <div
      role="row"
      data-index={viRow.index}
      className={clsx(
        "pxt-row pxt-row-border-b group absolute left-0 top-0",
        { "pxt-row-expanded": row.getIsExpanded() },
        { "pxt-row-selected": row.getIsSelected() },
      )}
      style={{
        height: `${viRow.size}px`,
        width: `${rowWidth}px`,
        transform: `translate3d(0, ${viRow.start - rowVirtualizer.options.scrollMargin}px, 0)`,
      }}
    >
      <div className="flex">
        {/* LEFT PINNED CELLS */}
        {left.length > 0 && (
          <div
            className="sticky left-0 z-20"
            style={{
              height: cellHeight,
              width: left.reduce((acc, cell) => acc + cell.getSize(), 0),
            }}
          >
            {row.getLeftVisibleCells().map((cell) => {
              const viCol = viCols.find((c) => c.key === cell.column.id);
              if (!viCol) return null;
              return (
                <VirtualizedRowCell
                  key={viCol.key.toString()}
                  cell={cell}
                  virtualColumn={viCol}
                  table={table}
                  className={clsx({
                    "pxt-row-expanded": row.getIsExpanded(),
                    "pxt-row-selected": row.getIsSelected(),
                  })}
                />
              );
            })}
          </div>
        )}

        {/* NON-PINNED CELLS */}
        <div
          className="w-full"
          style={{
            height: cellHeight,
          }}
        >
          {row.getCenterVisibleCells().map((cell) => {
            const viCol = viCols.find((c) => c.key === cell.column.id);
            if (!viCol) return null;
            return (
              <VirtualizedRowCell
                key={viCol.key.toString()}
                cell={cell}
                virtualColumn={viCol}
                table={table}
              />
            );
          })}
        </div>

        {/* RIGHT PINNED CELLS */}
        {right.length > 0 && (
          <div
            className="sticky right-0 z-20"
            style={{
              height: cellHeight,
              width: right.reduce((acc, cell) => acc + cell.getSize(), 0),
            }}
          >
            {row.getRightVisibleCells().map((cell) => {
              const viCol = viCols.find((c) => c.key === cell.column.id);
              if (!viCol) return null;
              return (
                <VirtualizedRowCell
                  key={viCol.key.toString()}
                  cell={cell}
                  virtualColumn={viCol}
                  table={table}
                />
              );
            })}
          </div>
        )}

        {/* ROW ACTIONS */}
        {rowActions.length > 0 && <RowActions row={row} />}
      </div>
      {/* EXPANDABLE ROW */}
      {row.getIsExpanded() && ExpandableRow && (
        <div className="pxt-border-b-row w-full border-t border-black-20 bg-white dark:border-black-92.5 dark:bg-black-95">
          <ExpandableRow row={row} />
        </div>
      )}
    </div>
  );
}
