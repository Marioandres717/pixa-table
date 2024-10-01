import { Row as TanRow, Table } from "@tanstack/react-table";
import RowActions from "./rowActions";
import clsx from "clsx";
import { RowCell } from "./rowCell";
import { gridGenerator } from "../utils";

type Props<TData> = {
  row: TanRow<TData>;
  table: Table<TData>;
};

export function Row<TData>({ row, table }: Props<TData>) {
  // const { left, right } = useMemo(() => getPinnedCols(cols), [cols]);
  const ExpandableRow = row.getExpandableRowComponent();
  const rowActions = row.getRowActions();
  // const { rowHeight = 36 } = table.getLayout();
  return (
    <div
      role="row"
      className={clsx(
        "group flex min-w-full flex-col border-b border-black-20 bg-white hover:bg-black-10 dark:border-black-92.5 dark:bg-black-100 dark:hover:bg-black-90",
        { "dark:!bg-black-95": row.getIsExpanded() },
        { "!bg-blue-30/10 dark:!bg-[#173344]": row.getIsSelected() },
      )}
      style={{
        width: table
          .getVisibleFlatColumns()
          .reduce((acc, col) => acc + col.getSize(), 0),
      }}
    >
      <div
        className="grid bg-inherit"
        style={{
          gridTemplateColumns: gridGenerator(table),
        }}
      >
        {/* LEFT PINNED CELLS */}
        {/* {left.length > 0 && (
          <div
            className="sticky left-0 z-20 bg-inherit"
            style={{
              height: cellHeight,
              width: left.reduce((acc, cell) => acc + cell.getSize(), 0),
            }}
          >
            {row.getLeftVisibleCells().map((cell) => (
              <RowCell key={cell.id} cell={cell} table={table} />
            ))}
          </div>
        )} */}

        {/* NON-PINNED CELLS */}
        {/* <div
          className="w-full bg-inherit"
          style={
            {
              // height: cellHeight,
            }
          }
        > */}
        {row.getCenterVisibleCells().map((cell) => (
          <RowCell key={cell.id} cell={cell} />
        ))}
        {/* </div> */}

        {/* RIGHT PINNED CELLS */}
        {/* {right.length > 0 && (
          <div
            className="sticky right-0 z-20 bg-inherit"
            style={{
              height: cellHeight,
              width: right.reduce((acc, cell) => acc + cell.getSize(), 0),
            }}
          >
            {row.getRightVisibleCells().map((cell) => (
              <RowCell key={cell.id} cell={cell} table={table} />
            ))}
          </div>
        )} */}

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
