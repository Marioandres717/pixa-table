import { Table, flexRender } from "@tanstack/react-table";
import "./index.css";
import { gridGenerator } from "../../utils";
import PageOptions from "../../components/pagination";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import HeaderSettings from "../../components/headerSettings";

export type AnomaliData = {
  name: string;
  company: string;
  location: string;
  date: string;
};

type Props = Table<AnomaliData>;

export default function TableAnomali(table: Props) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rows = table.getRowModel().rows;
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 40,
    getScrollElement: () => parentRef.current,
  });

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
          {table.getHeaderGroups().map((headerGroup) => (
            <div
              {...{
                key: headerGroup.id,
                className: "tr",
                style: {
                  display: "grid",
                  gridTemplateColumns: gridGenerator(table),
                  minWidth: "100%",
                },
              }}
            >
              {headerGroup.headers.map((header) => (
                <div className="th" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  <div
                    {...{
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      className: `resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`,
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          className="tbody"
          style={{
            position: "relative",
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              {...{
                key: virtualItem.key,
                className: "tr",
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "grid",
                  gridTemplateColumns: gridGenerator(table),
                  minWidth: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                },
              }}
            >
              {rows[virtualItem.index].getVisibleCells().map((cell) => (
                <div className="td" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tfooter">
          <PageOptions tableInstance={table} />
        </div>
      </div>
    </div>
  );
}
