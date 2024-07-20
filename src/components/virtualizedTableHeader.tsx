import { Table, flexRender, Header } from "@tanstack/react-table";
import { ColumnResize } from "./columnResize";
import { ColumnSort } from "./columnSort";

import styles from "./tableHeader.module.css";
import ColumnFilter from "./columnFilter";
import { gridGenerator } from "../utils";

type Props<TData> = {
  tableInstance: Table<TData>;
  filterColumnComponent?: React.ComponentType<{
    header: Header<TData, unknown>;
  }>;
};

export function VirtualizedTableHeader<TData>({
  tableInstance: table,
  filterColumnComponent: Filter = ColumnFilter,
}: Props<TData>) {
  const headerGroups = table.getHeaderGroups();

  return (
    <div role="rowheader" className="sticky top-0 z-10">
      {headerGroups.map((headerGroup) => (
        <div
          role="row"
          className="grid"
          {...{
            key: headerGroup.id,
            style: {
              gridTemplateColumns: gridGenerator(table),
            },
          }}
        >
          {headerGroup.headers.map((header) => (
            <div
              role="columnheader"
              className="flex max-h-8 items-center border-b border-r px-3 py-2 text-xs uppercase tracking-wider last:border-r-0 dark:border-black-92.5 dark:bg-black-95 dark:text-black-40"
              key={header.id}
              style={{
                justifyContent: header.column.columnDef.meta?.align,
              }}
            >
              <ColumnSort
                header={header}
                multiSort={table.getState().sorting.length > 1}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </ColumnSort>
              <div className={styles["filter-wrapper"]}>
                {header.column.getCanFilter() && <Filter header={header} />}
              </div>
              {header.column.getCanResize() && <ColumnResize header={header} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
