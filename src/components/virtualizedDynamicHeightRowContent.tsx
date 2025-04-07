import clsx from "clsx";
import { useCallback } from "react";
import { Row, Table } from "@tanstack/react-table";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { tableBodygridGenerator } from "../utils";
import RowActions from "./rowActions";
import { RowCell } from "./rowCell";

type Props<TData> = {
  row: Row<TData>;
  viRow: VirtualItem;
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
      className={clsx("pxt-row group absolute left-0 top-0 b-b", {
        "hover-bg": row.getIsExpanded(),
        "active-bg": row.getIsSelected(),
      })}
      style={{
        width: `${rowWidth}px`,
        transform: `translate3d(0, ${viRow.start - rowVirtualizer.options.scrollMargin}px, 0)`,
      }}
      data-active={row.getIsSelected()}
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
        <div className="w-full bg-surface-elevated b-t">
          <ExpandableRow row={row} />
        </div>
      )}
    </div>
  );
}
