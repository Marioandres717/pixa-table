import { Table, flexRender } from "@tanstack/react-table";
import "./tableAnomali.css";

export type AnomaliData = {
  name: string;
  company: string;
  location: string;
  date: string;
};

type Props = Table<AnomaliData>;

const gridGenerator = (table: Table<AnomaliData>) => {
  const visibleColumns = table.getVisibleFlatColumns();
  return visibleColumns
    .map((i, idx) =>
      visibleColumns.length === idx + 1
        ? `minmax(${i.getSize()}px ,auto)`
        : `${i.getSize()}px`
    )
    .join(" ");
};

export default function TableAnomali(table: Props) {
  if (!table) {
    throw new Error("TableAnomali requires a table object");
  }

  return (
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
      <div className="tbody">
        {table.getRowModel().rows.map((row) => (
          <div
            {...{
              key: row.id,
              className: "tr",
              style: {
                position: "relative",
                display: "grid",
                gridTemplateColumns: gridGenerator(table),
                minWidth: "100%",
              },
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <div className="td" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="tfoot">
        {table.getFooterGroups().map((footerGroup) => (
          <div
            {...{
              key: footerGroup.id,
              className: "tr",
              style: {
                display: "grid",
                gridTemplateColumns: gridGenerator(table),
                minWidth: "100%",
              },
            }}
          >
            {footerGroup.headers.map((footer) => (
              <div className="th" key={footer.id}>
                {footer.isPlaceholder
                  ? null
                  : flexRender(
                      footer.column.columnDef.footer,
                      footer.getContext()
                    )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
