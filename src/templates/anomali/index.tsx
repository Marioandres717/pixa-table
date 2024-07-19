import React from "react";
import { Header, Row, Table } from "@tanstack/react-table";
import {
  PageOptions,
  TableToolbar,
  TableHeader,
  VirtualizedTableBody,
  TableBody,
} from "../../components";
import TableSkeleton from "../../components/tableSkeleton";
import { VirtualizedTableHeader } from "../../components/virtualizedTableHeader";

import "./index.css";

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
  width,
  height,
  theme = "light",
  hideHeader = false,
  expandableRowComponent: ExpandRow,
  pageSizeComponent,
  paginationComponent: PageOptionsComponent = PageOptions,
  filterColumnComponent,
  disableRowHover,
  useVirtualizer,
  loading = false,
}: Props<TData>) {
  const isPaginationEnabled = table.options.getPaginationRowModel !== undefined;
  const parentRef = React.useRef<HTMLDivElement>(null);

  const headerHeight = hideHeader
    ? !isPaginationEnabled
      ? 0
      : 40
    : isPaginationEnabled
      ? 131
      : 40;

  if (loading) {
    return (
      <div
        data-pixa-theme={theme}
        className="table-container"
        style={{
          width: width || "100%",
          height: height || "100%",
        }}
      >
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div data-pixa-theme={theme} className="table-container">
      {!hideHeader && (
        <TableToolbar
          tableInstance={table}
          paginationPageSizeComponent={pageSizeComponent}
        />
      )}
      <div
        {...{
          ref: parentRef,
          // className: styles.table,
          style: {
            maxHeight: height && height - headerHeight,
          },
        }}
      >
        {!hideHeader &&
          (useVirtualizer ? (
            <VirtualizedTableHeader
              tableInstance={table}
              filterColumnComponent={filterColumnComponent}
            />
          ) : (
            <TableHeader
              tableInstance={table}
              filterColumnComponent={filterColumnComponent}
            />
          ))}
        {useVirtualizer ? (
          <VirtualizedTableBody
            tableInstance={table}
            parentRef={parentRef}
            disableRowHover={disableRowHover}
            expandableRowComponent={ExpandRow}
          />
        ) : (
          <TableBody
            tableInstance={table}
            expandableRowComponent={ExpandRow}
            disableRowHover={disableRowHover}
          />
        )}
      </div>
      {isPaginationEnabled && (
        // <div className={styles.tfooter}>
        <div className="tfooter">
          <PageOptionsComponent table={table} />
        </div>
      )}
    </div>
  );
}
