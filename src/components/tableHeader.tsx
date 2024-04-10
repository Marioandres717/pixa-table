import { Table, flexRender } from "@tanstack/react-table";
import { gridGenerator } from "../utils";
import ColumnResize from "./columnResize";
import ColumnSort from "./columnSort";

import "../index.css";

type Props<T> = {
  tableInstance: Table<T>;
};

export default function TableHeader<T>({ tableInstance }: Props<T>) {
  const headerGroups = tableInstance.getHeaderGroups();

  return (
    <>
      {headerGroups.map((headerGroup) => (
        <div
          {...{
            key: headerGroup.id,
            className: "tr",
            style: {
              display: "grid",
              gridTemplateColumns: gridGenerator(tableInstance),
              minWidth: "100%",
            },
          }}
        >
          {headerGroup.headers.map((header) => (
            <div
              className="th"
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
            >
              <ColumnSort header={header}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </ColumnSort>
              <ColumnResize header={header} />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
