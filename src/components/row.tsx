import { Row, Table } from "@tanstack/react-table";
import RowActions from "./rowActions";
import clsx from "clsx";
import { RowCell } from "./rowCell";
import { tableBodygridGenerator, calculateRowWidth } from "../utils";

type Props<TData> = {
  row: Row<TData>;
  table: Table<TData>;
};

export function DataRow<TData>({ row, table }: Props<TData>) {
  const ExpandableRow = row.getExpandableRowComponent();
  const rowActions = row.getRowActions();
  const { rowHeight = 36 } = table.getLayout();
  const isDynamicHeight = rowHeight === "dynamic";

  return (
    <div
      role="row"
      className={clsx("pxt-row group min-h-9", {
        "hover-bg": row.getIsExpanded(),
        "active-bg": row.getIsSelected(),
      })}
      style={{
        height: isDynamicHeight ? "auto" : rowHeight,
        width: calculateRowWidth(row.getVisibleCells(), rowActions.length > 0),
      }}
      data-active={row.getIsSelected()}
    >
      <div
        className="grid h-full bg-inherit b-b"
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
        <div className="w-full bg-surface-elevated">
          <ExpandableRow row={row} />
        </div>
      )}
    </div>
  );
}
