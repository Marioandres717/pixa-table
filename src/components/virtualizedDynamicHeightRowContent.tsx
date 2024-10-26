import clsx from "clsx";
import { useCallback } from "react";
import { Row, Table } from "@tanstack/react-table";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { tableBodygridGenerator } from "../utils";
import RowActions from "./rowActions";
import { RowCell } from "./rowCell";

type Props<TData> = {
  row: Row<TData>;
  viRow: VirtualItem<Element>;
  rowWidth: number;
  table: Table<TData>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
};

export function VirtualizedDynamicHeightRow<TData>({
  row,
  viRow,
  rowWidth,
  table,
  rowVirtualizer,
}: Props<TData>) {
  const rowActions = row.getRowActions();
  const ExpandableRow = row.getExpandableRowComponent();
  const measureRow = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      rowVirtualizer.measureElement(node);
    },
    [rowVirtualizer],
  );

  return (
    <div
      role="row"
      data-index={viRow.index}
      ref={measureRow}
      className={clsx(
        "pxt-row group absolute left-0 top-0",
        { "pxt-row-expanded": row.getIsExpanded() },
        { "pxt-row-selected": row.getIsSelected() },
      )}
      style={{
        width: `${rowWidth}px`,
        transform: `translate3d(0, ${viRow.start}px, 0)`,
      }}
    >
      <div
        className="grid h-full bg-inherit"
        style={{
          gridTemplateColumns: tableBodygridGenerator(
            row.getVisibleCells(),
            rowActions.length > 0,
          ),
        }}
      >
        {row.getVisibleCells().map((cell) => (
          <RowCell key={cell.id} cell={cell} table={table} />
        ))}

        {/* ROW ACTIONS */}
        {rowActions.length > 0 && <RowActions row={row} />}
      </div>
      {/* EXPANDABLE ROW */}
      {row.getIsExpanded() && ExpandableRow && (
        <div className="w-full border-t border-black-20 bg-white dark:border-black-92.5 dark:bg-black-95">
          <ExpandableRow row={row} />
        </div>
      )}
    </div>
  );
}
