import { useMemo } from "react";
import {
  Column,
  HeaderGroup,
  RowData,
  TableState,
} from "@tanstack/react-table";
import { VirtualizedHeaderCell } from "./virtualizedHeaderCell";
import { getPinnedCols } from "../utils";
import { Virtualizer } from "@tanstack/react-virtual";

type Props<TData> = {
  cols: Column<TData, RowData>[];
  headerGroup: HeaderGroup<TData>;
  state: TableState;
  colVirtualizer: Virtualizer<HTMLDivElement, Element>;
};

export function VirtualizedHeaderRow<TData>({
  cols,
  headerGroup,
  state,
  colVirtualizer,
}: Props<TData>) {
  const { left, right } = useMemo(() => getPinnedCols(cols), [cols]);
  const viCols = colVirtualizer.getVirtualItems();
  return (
    <div
      key={headerGroup.id}
      role="row"
      className="flex h-8 bg-surface-elevated b-b"
    >
      {/* LEFT PINNED COLS */}
      <div
        className="sticky left-0 top-0 z-10 h-full bg-inherit"
        style={{
          width: left.reduce((acc, col) => acc + col.getSize(), 0),
        }}
      >
        {headerGroup.headers
          .filter((header) => header.column.getIsPinned() === "left")
          .map((header) => {
            const viCol = viCols.find((viCol) => viCol.key === header.id);
            if (!viCol) return null;
            return (
              <VirtualizedHeaderCell
                key={viCol.key.toString()}
                header={header}
                virtualColumn={viCol}
                state={state}
              />
            );
          })}
      </div>

      {/* NON-PINNED COLS */}
      <div className="h-full w-full">
        {headerGroup.headers
          .filter((header) => !header.column.getIsPinned())
          .map((header) => {
            const viCol = viCols.find((viCol) => viCol.key === header.id);
            if (!viCol) return null;
            return (
              <VirtualizedHeaderCell
                key={viCol.key.toString()}
                header={header}
                virtualColumn={viCol}
                state={state}
              />
            );
          })}
      </div>

      {/* RIGHT PINNED COLS */}
      <div
        className="sticky right-0 top-0 z-10 h-full bg-inherit"
        style={{
          width: right.reduce((acc, col) => acc + col.getSize(), 0),
        }}
      >
        {headerGroup.headers
          .filter((header) => header.column.getIsPinned() === "right")
          .map((header) => {
            const viCol = viCols.find((viCol) => viCol.key === header.id);
            if (!viCol) return null;
            return (
              <VirtualizedHeaderCell
                key={viCol.key.toString()}
                header={header}
                virtualColumn={viCol}
                state={state}
              />
            );
          })}
      </div>
    </div>
  );
}
