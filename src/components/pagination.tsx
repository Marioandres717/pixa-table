import { Table } from "@tanstack/react-table";
import "./pagination.css";

type Props<TData> = {
  pageSize: number;
  pageIndex: number;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  tableInstance: Table<TData>;
};

function PageOptions<TData>({
  tableInstance,
  pageIndex,
  onPaginationChange,
  pageSize,
}: Props<TData>) {
  const { getPageOptions, getCanPreviousPage, getCanNextPage } = tableInstance;
  const { start, end } = pageRange(pageIndex, getPageOptions().length);
  const pageOptionsState = nextPages(start, end);

  function onPageChange(index: number) {
    onPaginationChange({ pageIndex: index, pageSize });
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

export default PageOptions;
