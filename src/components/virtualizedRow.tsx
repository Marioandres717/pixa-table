import { useMemo } from "react";
import clsx from "clsx";
import { Column, Row, RowData } from "@tanstack/react-table";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { getPinnedCols } from "../utils";
import { ColumnCell } from "./columnCell";

type Props<TData> = {
  row: Row<TData>;
  cols: Column<TData, RowData>[];
  viRow: VirtualItem<Element>;
  viCols: VirtualItem<Element>[];
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
};

export default function VirtualizedRow<TData>({
  row,
  cols,
  viRow,
  rowVirtualizer,
  viCols,
}: Props<TData>) {
  const { left, right } = useMemo(() => getPinnedCols(cols), [cols]);
  const ExpandableRow = row.getExpandableRowComponent();

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
      ref={(node) => rowVirtualizer.measureElement(node)}
      style={{
        transform: `translateY(${viRow.start}px)`,
      }}
    >
      <div className="flex bg-inherit">
        {/* LEFT PINNED CELLS */}
        {left.length > 0 && (
          <div
            className="pointer-events-none sticky left-0 z-10 h-[35px] bg-transparent"
            style={{
              width: left.reduce((acc, cell) => acc + cell.getSize(), 0),
            }}
          >
            {row.getLeftVisibleCells().map((cell) => {
              const viCol = viCols.find((c) => c.key === cell.column.id);
              if (!viCol) return null;
              return (
                <ColumnCell key={viCol.key} cell={cell} virtualColumn={viCol} />
              );
            })}
          </div>
        )}

        {/* NON-PINNED CELLS */}
        <div className="h-[35px] w-full">
          {row.getCenterVisibleCells().map((cell) => {
            const viCol = viCols.find((c) => c.key === cell.column.id);
            if (!viCol) return null;
            return (
              <ColumnCell key={viCol.key} cell={cell} virtualColumn={viCol} />
            );
          })}
        </div>

        {/* RIGHT PINNED CELLS */}
        {right.length > 0 && (
          <div
            className="pointer-events-none sticky right-0 z-10 h-[35px] bg-transparent opacity-0 group-hover:opacity-100"
            style={{
              width: right.reduce((acc, cell) => acc + cell.getSize(), 0),
            }}
          >
            {row.getRightVisibleCells().map((cell) => {
              const viCol = viCols.find((c) => c.key === cell.column.id);
              if (!viCol) return null;
              return (
                <ColumnCell key={viCol.key} cell={cell} virtualColumn={viCol} />
              );
            })}
          </div>
        )}
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
