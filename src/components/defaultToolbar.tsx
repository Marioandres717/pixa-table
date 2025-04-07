import { Table } from "@tanstack/react-table";
import { PageResults } from "./pageResults";
import { SettingsDropdown } from "./settingsDropdown";
import { PageSize } from "./pageSize";
import { Pagination } from "./pagination";

type DefaultToolbarProps<TData> = {
  table: Table<TData>;
};

function getPageSizeComponent<TData>(table: Table<TData>) {
  return table.getPageSizeComponent() || PageSize;
}

function getPaginationComponent<TData>(table: Table<TData>) {
  return table.getPaginationComponent() || Pagination;
}

function getViewOptionsComponent<TData>(table: Table<TData>) {
  return (
    table.getViewOptionsComponent() ||
    (() => <span data-testid="view-options"></span>)
  );
}

export function DefaultToolbar<TData>({ table }: DefaultToolbarProps<TData>) {
  const PageSizeComponent = getPageSizeComponent(table);
  const PaginationComponent = getPaginationComponent(table);
  const ViewOptionsComponent = getViewOptionsComponent(table);
  const showPagination = table.getShowPagination();
  const showTotalResults = table.getShowTotalResults();
  const showViewOptions = table.getShowViewOptions();

  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="flex h-6 flex-1 items-center gap-2.5">
        {showPagination && (
          <PageSizeComponent
            table={table}
            className="inline-block h-6 leading-[1.2] text"
          />
        )}
        {showViewOptions && <ViewOptionsComponent table={table} />}
      </div>

      {showTotalResults && <PageResults table={table} />}

      <div className="flex flex-1 justify-end gap-6">
        {(showPagination === "top" || showPagination === "both") && (
          <PaginationComponent table={table} />
        )}
        <SettingsDropdown table={table} />
      </div>
    </div>
  );
}
