import React from "react";
import { Header, Row, Table } from "@tanstack/react-table";
import {
  PageOptions,
  HeaderSettings,
  TableHeader,
  VirtualizedTableBody,
  TableBody,
} from "../../components";

import "../../index.css";
import styles from "./index.module.css";
import TableSkeleton from "../../components/tableSkeleton";

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
        className={styles["table-container"]}
        style={{
          width: width || "100%",
          height: height || "100%",
        }}
      >
        <TableSkeleton theme={theme} />
      </div>
    );
  }

  return (
    <div data-pixa-theme={theme} className={styles["table-container"]}>
      {!hideHeader && (
        <div className={styles["header-settings"]}>
          <HeaderSettings
            tableInstance={table}
            paginationPageSizeComponent={pageSizeComponent}
          />
        </div>
      )}
      <div
        {...{
          ref: parentRef,
          className: styles.table,
          style: {
            maxHeight: height && height - headerHeight,
          },
        }}
      >
        {!hideHeader && (
          <TableHeader
            tableInstance={table}
            filterColumnComponent={filterColumnComponent}
          />
        )}
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
        <div className={styles.tfooter}>
          <PageOptionsComponent table={table} />
        </div>
      )}
    </div>
  );
}
