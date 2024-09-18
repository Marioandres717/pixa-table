import { Column, Row, RowData, Table } from "@tanstack/react-table";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { VirtualizedDynamicHeightRow } from "./virtualizedDynamicHeightRowContent";
import { VirtualizedFixedHeightRow } from "./virtualizedFixedHeightRowContent";

type Props<TData> = {
  row: Row<TData>;
  viRow: VirtualItem<Element>;
  colVirtualizer: Virtualizer<HTMLDivElement, Element>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  rowWidth: number;
  table: Table<TData>;
  cols: Column<TData, RowData>[];
};

export function VirtualizedRow<TData>({
  row,
  viRow,
  rowVirtualizer,
  colVirtualizer,
  rowWidth,
  table,
  cols,
}: Props<TData>) {
  const { rowHeight } = table.getLayout();
  const isDynamicRowHeight = rowHeight === "dynamic";

  if (isDynamicRowHeight) {
    return (
      <VirtualizedDynamicHeightRow
        viRow={viRow}
        row={row}
        rowWidth={rowWidth}
        table={table}
        rowVirtualizer={rowVirtualizer}
      />
    );
  }

  return (
    <VirtualizedFixedHeightRow
      row={row}
      viRow={viRow}
      rowWidth={rowWidth}
      table={table}
      colVirtualizer={colVirtualizer}
      cols={cols}
    />
  );
}
