import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Table } from "@tanstack/react-table";
import {
  TableToolbar,
  VirtualizedTableBody,
  VirtualizedTableHeader,
  TableSidebar,
  Pagination,
} from "./";
import { TableSkeleton } from "./tableSkeleton";
import { calculateGridTemplate } from "../utils";

type Props<TData> = {
  table: Table<TData>;
};

export function PixaTable<TData>({ table }: Props<TData>) {
  const [, setTriggerRerender] = useState(0);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const isLoading = table.getState().isLoading;
  const {
    showFooter,
    showHeader,
    showSidebar,
    maxHeight: mh,
  } = table.getLayout();
  const maxHeight = mh === "fluid" ? undefined : mh;
  const PaginationComponent = table.getPagination() || Pagination;

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
    <div
      className="pixa-table"
      style={{ display: "contents" }}
      data-theme={table.getTheme()}
    >
      <div
        role="table"
        data-test-id="pixa-table"
        style={{ maxHeight }}
        className={clsx(
          "h-full min-h-40 w-full rounded-[4px] border border-solid bg-black-5 font-sans text-table-base dark:border-black-92.5 dark:bg-black-100 dark:text-black-10",
          calculateGridTemplate({
            showFooter: showFooter,
            showHeader: showHeader,
            showSidebar: showSidebar,
          }),
        )}
      >
        {showHeader && (
          <TableToolbar
            className={`col-span-full col-start-1 row-start-1`}
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
          className={clsx("relative overflow-auto", {
            "col-start-1": showSidebar,
            "row-start-1": !showHeader,
          })}
          {...{
            ref: parentRef,
            style: {
              maxHeight: `calc(${maxHeight}px - ${showFooter && showHeader ? 88 : 46}px - 2px)`, // 2x for border
            },
          }}
        >
          {showHeader && (
            <VirtualizedTableHeader table={table} parentRef={parentRef} />
          )}

          <VirtualizedTableBody table={table} parentRef={parentRef} />
        </div>
        {showFooter && (
          <div className="col-span-full flex h-11 justify-end border-t px-3 py-2 dark:border-black-92.5">
            <PaginationComponent table={table} />
          </div>
        )}
      </div>
    </div>
  );
}
