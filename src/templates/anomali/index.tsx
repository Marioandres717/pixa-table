import { Table, flexRender } from "@tanstack/react-table";
import "./index.css";
import { gridGenerator } from "../../utils";
import PageOptions from "../../components/pagination";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import HeaderSettings from "../../components/headerSettings";
import TableHeader from "../../components/tableHeader";

type Props<T> = Table<T>;

export default function TableAnomali<T>(table: Props<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rows = table.getRowModel().rows;
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 40,
    getScrollElement: () => parentRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });
  const viRows = rowVirtualizer.getVirtualItems();

  return (
    <div ref={parentRef} className="table-container" style={{ width: "100%" }}>
      <div className="headerSettings">
        <HeaderSettings tableInstance={table} />
      </div>
      <div
        {...{
          className: "table",
          style: {
            width: "100%",
          },
        }}
      >
        <div className="thead">
          <TableHeader tableInstance={table} />
        </div>
        <div
          className="tbody"
          style={{
            position: "relative",
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {viRows.map((virtualItem) => {
            const row = rows[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={(node) => rowVirtualizer.measureElement(node)}
                {...{
                  className: "tr",
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "grid",
                    gridTemplateColumns: gridGenerator(table),
                    minWidth: "100%",
                    minHeight: "40px", // Added 'minHeight: 40px' to fix 'min-height: 0px
                    transform: `translateY(${virtualItem.start}px)`,
                  },
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div className="td" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
                {row.getIsExpanded() && <h1>LOOOOOL</h1>}
              </div>
            );
          })}
        </div>
        <div className="tfooter">
          <PageOptions tableInstance={table} />
        </div>
      </div>
    </div>
  );
}
