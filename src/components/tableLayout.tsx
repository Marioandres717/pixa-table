import { useState, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { Table } from "@tanstack/react-table";
import { calculateGridTemplate } from "../utils";
import { TableHeader } from "./tableHeader";
import { Pagination } from "./pagination";
import { TableToolbar } from "./tableToolbar";
import { TableSidebar } from "./tableSidebar";
import { VirtualizedTableHeader } from "./virtualizedTableHeader";
import { VirtualizedTableBody } from "./virtualizedTableBody";
import { TableBody } from "./tableBody";
import { useResizeObserver } from "../hooks";

type Props<TData> = {
  table: Table<TData>;
};

export function TableLayout<TData>({ table }: Props<TData>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [, setTriggerRerender] = useState(0);

  // const handleResize = useCallback(
  //   () => setTriggerRerender((prev) => prev + 1),
  //   [],
  // );

  const {
    showFooter,
    showHeader,
    showSidebar,
    showPagination,
    enableVirtualization,
    maxHeight,
    rowHeight,
  } = table.getLayout();

  const PaginationComponent = table.getPaginationComponent() || Pagination;
  const isDynamicRowHeight = rowHeight === "dynamic";
  // useResizeObserver(parentRef, handleResize);
  useEffect(() => {
    setTriggerRerender((prev) => prev + 1);
  }, [parentRef.current]);

  return (
    <div
      role="table"
      data-testid="pixa-table"
      style={{ maxHeight }}
      className={clsx(
        "h-full min-h-40 w-full overflow-x-clip overflow-y-visible rounded-[4px] border border-solid border-black-20 bg-white font-sans text-table-base text-black-100 dark:border-black-92.5 dark:bg-black-100 dark:text-black-10",
        calculateGridTemplate({
          showFooter,
          showHeader,
          showSidebar,
        }),
      )}
    >
      {showHeader && (
        <TableToolbar
          className="col-span-full col-start-1 row-start-1"
          table={table}
        />
      )}
      {showSidebar && (
        <TableSidebar
          className={clsx("col-start-2", {
            "row-start-2": showHeader,
            "row-start-1": !showHeader,
          })}
          table={table}
        />
      )}
      <div
        data-testid="table-scroll-container"
        className={clsx("relative overflow-auto", {
          "col-start-1": showSidebar,
          "row-start-1": !showHeader,
        })}
        ref={parentRef}
        style={{
          maxHeight: `calc(${maxHeight}px - ${showFooter && showHeader ? 88 : 46}px - 2px)`, // 2x for border
        }}
      >
        {showHeader && enableVirtualization && !isDynamicRowHeight && (
          <VirtualizedTableHeader table={table} parentRef={parentRef} />
        )}
        {showHeader && (!enableVirtualization || isDynamicRowHeight) && (
          <TableHeader table={table} />
        )}
        {enableVirtualization && (
          <VirtualizedTableBody table={table} parentRef={parentRef} />
        )}
        {!enableVirtualization && <TableBody table={table} />}
      </div>
      {showFooter && (
        <div className="col-span-full flex h-11 items-center justify-end border-t border-black-20 bg-black-10 px-3 py-2 dark:border-black-92.5 dark:bg-black-100">
          {(showPagination === "bottom" || showPagination === "both") && (
            <PaginationComponent table={table} />
          )}
        </div>
      )}
    </div>
  );
}
