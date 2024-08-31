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

export function DefaultToolbar<TData>({ table }: DefaultToolbarProps<TData>) {
  const PageSizeComponent = getPageSizeComponent(table);
  const PaginationComponent = getPaginationComponent(table);
  const showPagination = table.getShowPagination();
  const showTotalResults = table.getShowTotalResults();

  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="h-6 flex-1">
        {showPagination && (
          <PageSizeComponent
            table={table}
            className={"h-6 text-table-base leading-[1.2]"}
          />
        )}
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
