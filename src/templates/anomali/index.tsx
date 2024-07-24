import React from "react";
import { Header, Row, Table } from "@tanstack/react-table";
import {
  PageOptions,
  TableToolbar,
  // TableHeader,
  VirtualizedTableBody,
  // TableBody,
} from "../../components";
import { VirtualizedTableHeader } from "../../components/virtualizedTableHeader";
import TableSidebar from "../../components/tableSidebar";

type Props<TData> = {
  tableInstance: Table<TData>;
  theme: "light" | "dark";
  loading?: boolean;
  disableRowHover?: boolean;
  width?: number;
  height?: number;
  hideHeader?: boolean;
  useVirtualizer?: boolean;
  expandableRowComponent?: React.ComponentType<{ row: Row<TData> }>;
  pageSizeComponent?: React.ComponentType<{ table: Table<TData> }>;
  paginationComponent?: React.ComponentType<{ table: Table<TData> }>;
  filterColumnComponent?: React.ComponentType<{
    header: Header<TData, unknown>;
  }>;
};

export function TableAnomali<TData>({
  tableInstance: table,
  // width,
  // height,
  theme = "light",
  hideHeader = false,
  expandableRowComponent: ExpandRow,
  pageSizeComponent,
  paginationComponent: PageOptionsComponent = PageOptions,
  filterColumnComponent,
  disableRowHover,
  // useVirtualizer,
  // loading = false,
}: Props<TData>) {
  const isPaginationEnabled = table.options.getPaginationRowModel !== undefined;
  const parentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      data-pixa-theme={theme}
      className="grid h-full w-full grid-cols-[1fr,44px] grid-rows-[44px_minMax(44px,auto)_44px] overflow-hidden rounded-[4px] border border-solid font-sans text-sm dark:border-black-92.5 dark:bg-black-100 dark:text-black-10"
    >
      {!hideHeader && (
        <TableToolbar
          className={`col-span-full col-start-1 row-start-1`}
          tableInstance={table}
          paginationPageSizeComponent={pageSizeComponent}
        />
      )}
      <TableSidebar className="col-start-2 row-start-2 overflow-hidden" />
      <div
        className="col-start-1 row-start-2 overflow-auto"
        {...{
          ref: parentRef,
        }}
      >
        <VirtualizedTableHeader
          tableInstance={table}
          parentRef={parentRef}
          filterColumnComponent={filterColumnComponent}
        />

        <VirtualizedTableBody
          tableInstance={table}
          parentRef={parentRef}
          disableRowHover={disableRowHover}
          expandableRowComponent={ExpandRow}
        />
      </div>
      {isPaginationEnabled && (
        <div className="col-span-full row-start-3 flex h-11 justify-end border-t px-3 py-2 dark:border-black-92.5">
          <PageOptionsComponent table={table} />
        </div>
      )}
    </div>
  );
}
