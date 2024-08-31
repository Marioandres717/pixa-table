import { Table } from "@tanstack/react-table";
import { Icon } from "./icon";
import { Button } from "./button";
import clsx from "clsx";

type Props<TData> = {
  table: Table<TData>;
};

export function Pagination<TData>({ table }: Props<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const { getPageOptions, getCanPreviousPage, getCanNextPage } = table;
  const { start, end } = pageRange(pageIndex, getPageOptions().length);
  const pageOptionsState = nextPages(start, end);

  function onPageChange(index: number) {
    table.setPageIndex(index);
  }

  function nextPages(page: number, limit: number) {
    const pages = [];
    if (page !== 1) {
      pages.unshift(1);
    }
    for (let i = page; i <= limit; i++) {
      pages.push(i);
    }

    return pages;
  }

  function pageRange(page: number, pageCount: number) {
    let start = page - 2,
      end = page + 2;

    if (end > pageCount) {
      start -= end - pageCount;
      end = pageCount;
    }
    if (start <= 0) {
      end += (start - 1) * -1;
      start = 1;
    }
    end = end > pageCount ? pageCount : end;
    return { start, end };
  }

  return (
    <div className="flex gap-1">
      <Button
        onClick={(e) => {
          e.preventDefault();
          onPageChange(pageIndex - 1);
        }}
        disabled={!getCanPreviousPage()}
      >
        <Icon icon="arrow-new" size={12} className="rotate-180 fill-current" />
      </Button>
      {pageOptionsState.map((option) => (
        <Button
          key={option}
          className={clsx(
            pageIndex === option - 1 ? "!bg-aqua-120 !text-black-100" : "",
          )}
          onClick={() => onPageChange(option - 1)}
        >
          {option}
        </Button>
      ))}
      <Button
        onClick={(e) => {
          e.preventDefault();
          onPageChange(pageIndex + 1);
        }}
        disabled={!getCanNextPage()}
      >
        <Icon icon="arrow-new" size={12} className="fill-current" />
      </Button>
    </div>
  );
}
