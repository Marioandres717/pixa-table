import { Header } from "@tanstack/react-table";
import { Icon } from "./icon";
import { getSortIcon } from "./sortIcon";

type Props<TData> = {
  header: Header<TData, unknown>;
  multiSort?: boolean;
};

export function HeaderSorting<TData>({ header, multiSort }: Props<TData>) {
  const { column } = header;
  const sortDirection = column.getIsSorted();
  if (!column.getCanSort()) return null;
  return (
    <div
      className="cursor-pointer"
      onClick={header.column.getToggleSortingHandler()}
    >
      {column.getCanSort() && (
        <>
          {multiSort && getSortIcon(column)}

          {!multiSort && (
            <Icon
              icon={sortDirection ? `sort-${sortDirection}` : "sort-asc"}
              className={`!h-3 !w-8 flex-shrink-0 ${column.getIsSorted() ? "fill-aqua-120 dark:fill-aqua-100" : "fill-black-70"}`}
            />
          )}
        </>
      )}
    </div>
  );
}
