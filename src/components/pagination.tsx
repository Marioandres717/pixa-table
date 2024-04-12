import { Table } from "@tanstack/react-table";
import "./pagination.css";

type Props<TData> = {
  tableInstance: Table<TData>;
};

export default function PageOptions<TData>({ tableInstance }: Props<TData>) {
  const pageIndex = tableInstance.getState().pagination.pageIndex;
  const { getPageOptions, getCanPreviousPage, getCanNextPage } = tableInstance;
  const { start, end } = pageRange(pageIndex, getPageOptions().length);
  const pageOptionsState = nextPages(start, end);

  function onPageChange(index: number) {
    tableInstance.setPageIndex(index);
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
    <div className="paginationContent">
      <button
        className="prev-button"
        onClick={(e) => {
          e.preventDefault();
          onPageChange(pageIndex - 1);
        }}
        disabled={!getCanPreviousPage()}
      >
        {"Previous"}
      </button>
      <span>
        <strong>
          {pageOptionsState.map((option) => {
            return (
              <span
                key={option}
                className={
                  option - 1 === pageIndex
                    ? "numberItem numberColor"
                    : "numberItem"
                }
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => {
                  onPageChange(option - 1);
                }}
              >
                {option}
              </span>
            );
          })}
        </strong>
      </span>
      <button
        className="next-button"
        onClick={(e) => {
          e.preventDefault();
          onPageChange(pageIndex + 1);
        }}
        disabled={!getCanNextPage()}
      >
        {"Next"}
      </button>
    </div>
  );
}
