import { useState, useRef, useCallback } from "react";
import clsx from "clsx";
import { Table } from "@tanstack/react-table";
import { calculateGridTemplate, calculateTableBodyHeight } from "../utils";
import { TableHeader } from "./tableHeader";
import { TableToolbar } from "./tableToolbar";
import { TableSidebar } from "./tableSidebar";
import { VirtualizedTableHeader } from "./virtualizedTableHeader";
import { VirtualizedTableBody } from "./virtualizedTableBody";
import { TableBody } from "./tableBody";
import { useResizeObserver } from "../hooks";
import { TableTitle } from "./tableTitle";
import { TableFooter } from "./tableFooter";

type Props<TData> = {
  table: Table<TData>;
};

export function TableLayout<TData>({ table }: Props<TData>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [, setTriggerRerender] = useState(0);
  const {
    showFooter,
    showHeader,
    showSidebar,
    showTitle,
    enableVirtualization,
    maxHeight,
    scrollableContainerRef,
  } = table.getLayout();

  const handleResize = useCallback(
    () => setTriggerRerender((prev) => prev + 1),
    [],
  );
  const scrollableRef = scrollableContainerRef
    ? scrollableContainerRef
    : parentRef;

  useResizeObserver(scrollableRef, handleResize);

  return (
    <div
      role="table"
      data-testid="pixa-table"
      style={{ maxHeight }}
      className={clsx(
        "min-h-40 w-full overflow-x-clip overflow-y-visible rounded-[4px] border border-solid border-black-20 bg-white font-sans text-table-base text-black-100 dark:border-black-92.5 dark:bg-black-100 dark:text-black-10",
        calculateGridTemplate({
          showFooter,
          showHeader,
          showSidebar,
          showTitle,
        }),
      )}
    >
      {showHeader && showTitle && (
        <TableTitle
          table={table}
          className={clsx("col-span-full row-start-1")}
        />
      )}
      {showHeader && (
        <TableToolbar
          className={clsx("col-span-full col-start-1", {
            "row-start-1": !showTitle,
            "row-start-2": showTitle,
          })}
          table={table}
        />
      )}
      {showSidebar && (
        <TableSidebar
          className={clsx("col-start-2", {
            "row-start-1": !showHeader,
            "row-start-2": showHeader && !showTitle,
            "row-start-3": showHeader && showTitle,
          })}
          table={table}
        />
      )}
      <div
        data-testid="table-scroll-container"
        className={clsx("relative col-start-1 overflow-auto scrollbar", {
          "row-start-1": !showHeader,
          "row-start-2": showHeader && !showTitle,
          "row-start-3": showHeader && showTitle,
        })}
        ref={!scrollableContainerRef ? parentRef : undefined}
        style={{
          maxHeight: calculateTableBodyHeight(table.getLayout()),
        }}
      >
        {showHeader && enableVirtualization && (
          <VirtualizedTableHeader table={table} parentRef={scrollableRef} />
        )}
        {showHeader && !enableVirtualization && <TableHeader table={table} />}

        {enableVirtualization && (
          <VirtualizedTableBody table={table} parentRef={scrollableRef} />
        )}

        {!enableVirtualization && <TableBody table={table} />}
      </div>

      {showFooter && <TableFooter table={table} className="col-span-full" />}
    </div>
  );
}
