import React, { useEffect, useState } from "react";
import { Header, Row, Table } from "@tanstack/react-table";
import {
  PageOptions,
  TableToolbar,
  VirtualizedTableBody,
  VirtualizedTableHeader,
  TableSidebar,
} from "./";
import { TableSkeleton } from "./tableSkeleton";

type Props<TData> = {
  table: Table<TData>;
  loading?: boolean;
  hideHeader?: boolean;
  expandableRowComponent?: React.ComponentType<{ row: Row<TData> }>;
  pageSizeComponent?: React.ComponentType<{ table: Table<TData> }>;
  paginationComponent?: React.ComponentType<{ table: Table<TData> }>;
  filterColumnComponent?: React.ComponentType<{
    header: Header<TData, unknown>;
  }>;
};

export function PixaTable<TData>({
  table: table,
  hideHeader = false,
  expandableRowComponent: ExpandRow,
  paginationComponent: PageOptionsComponent = PageOptions,
  filterColumnComponent,
}: Props<TData>) {
  const [, setTriggerRerender] = useState(0);
  const isPaginationEnabled = table.options.getPaginationRowModel !== undefined;
  const parentRef = React.useRef<HTMLDivElement>(null);
  const isLoading = table.getState().isLoading;

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setTriggerRerender((prev) => prev + 1);
    });

    const ref = parentRef;

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

  if (isLoading) {
    return <TableSkeleton theme={table.getTheme()} />;
  }

  return (
    <div className="pixa-table contents" data-theme={table.getTheme()}>
      <div
        data-test-id="pixa-table"
        role="table"
        className="grid h-full w-full grid-cols-[1fr,32px] grid-rows-[44px_minMax(44px,auto)_44px] rounded-[4px] border border-solid bg-black-5 font-sans text-table-base dark:border-black-92.5 dark:bg-black-100 dark:text-black-10"
      >
        {!hideHeader && (
          <TableToolbar
            className={`col-span-full col-start-1 row-start-1`}
            table={table}
          />
        )}
        <TableSidebar className="col-start-2 row-start-2" table={table} />
        <div
          className="relative col-start-1 row-start-2 overflow-auto"
          {...{
            ref: parentRef,
          }}
        >
          {!hideHeader && (
            <VirtualizedTableHeader
              table={table}
              parentRef={parentRef}
              filterColumnComponent={filterColumnComponent}
            />
          )}

          <VirtualizedTableBody
            table={table}
            parentRef={parentRef}
            expandableRowComponent={ExpandRow}
          />
        </div>
        {isPaginationEnabled && (
          <div className="col-span-full row-start-3 flex h-11 justify-end border-t px-3 py-2 dark:border-black-92.5">
            <PageOptionsComponent table={table} />
          </div>
        )}
      </div>
    </div>
  );
}
