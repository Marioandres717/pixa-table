import { useMemo } from "react";
import clsx from "clsx";
import { Column, Row, RowData, Table } from "@tanstack/react-table";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { calculateHeightOfCells, getPinnedCols } from "../utils";
import { ColumnCell } from "./columnCell";
import RowActions from "./rowActions";

type Props<TData> = {
  row: Row<TData>;
  cols: Column<TData, RowData>[];
  viRow: VirtualItem;
  colVirtualizer: Virtualizer<HTMLDivElement, Element>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  rowWidth: number;
  table: Table<TData>;
};

export function VirtualizedRow<TData>({
  row,
  cols,
  viRow,
  rowVirtualizer,
  colVirtualizer,
  rowWidth,
  table,
}: Props<TData>) {
  const { left, right } = useMemo(() => getPinnedCols(cols), [cols]);
  const ExpandableRow = row.getExpandableRowComponent();
  const viCols = colVirtualizer.getVirtualItems();
  const rowActions = row.getRowActions();
  const { rowHeight = 36 } = table.getLayout();
  const isDynamicRowHeight = rowHeight === "dynamic";
  const cellHeight = isDynamicRowHeight
    ? calculateHeightOfCells(36)
    : calculateHeightOfCells(rowHeight);

  return (
    <div
      role="row"
      key={viRow.key}
      data-index={viRow.index}
      className={clsx(
        "group absolute left-0 top-0 flex flex-col border-b bg-black-5 hover:bg-black-10 dark:border-black-92.5 dark:bg-black-100 dark:hover:bg-black-90",
        { "dark:!bg-black-95": row.getIsExpanded() },
        { "dark:!bg-[#173344]": row.getIsSelected() },
      )}
      ref={(node) => isDynamicRowHeight && rowVirtualizer.measureElement(node)}
      style={{
        height: isDynamicRowHeight ? undefined : `${viRow.size}px`,
        width: `${rowWidth}px`,
        transform: `translateY(${viRow.start}px)`,
      }}
    >
      <div className="flex bg-inherit">
        {/* LEFT PINNED CELLS */}
        {left.length > 0 && (
          <div
            className="sticky left-0 z-20 bg-inherit"
            style={{
              height: cellHeight,
              width: left.reduce((acc, cell) => acc + cell.getSize(), 0),
            }}
          >
            {row.getLeftVisibleCells().map((cell) => {
              const viCol = viCols.find((c) => c.key === cell.column.id);
              if (!viCol) return null;
              return (
                <ColumnCell
                  key={viCol.key}
                  cell={cell}
                  virtualColumn={viCol}
                  table={table}
                />
              );
            })}
          </div>
        )}

        {/* NON-PINNED CELLS */}
        <div
          className="w-full bg-inherit"
          style={{
            height: cellHeight,
          }}
        >
          {row.getCenterVisibleCells().map((cell) => {
            const viCol = viCols.find((c) => c.key === cell.column.id);
            if (!viCol) return null;
            return (
              <ColumnCell
                key={viCol.key}
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
            className="sticky right-0 z-20 bg-inherit"
            style={{
              height: cellHeight,
              width: right.reduce((acc, cell) => acc + cell.getSize(), 0),
            }}
          >
            {row.getRightVisibleCells().map((cell) => {
              const viCol = viCols.find((c) => c.key === cell.column.id);
              if (!viCol) return null;
              return (
                <ColumnCell
                  key={viCol.key}
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

      {/* Expandable Row */}
      {row.getIsExpanded() && ExpandableRow && (
        <div className="w-full border-t dark:border-black-92.5">
          <ExpandableRow row={row} />
        </div>
      )}
    </div>
  );
}