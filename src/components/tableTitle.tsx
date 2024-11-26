import { Table } from "@tanstack/react-table";
import clsx from "clsx";
import { Button } from "./button";

type TableTitleProps<TData> = {
  table: Table<TData>;
  className?: string;
};

export function TableTitle<TData>({
  table,
  className,
}: TableTitleProps<TData>) {
  const tableActions = table.getTableActions();
  return (
    <div
      className={clsx(
        "flex h-11 shrink-0 items-center justify-between border-b border-black-20 border-b-black-20 bg-black-10 px-3 py-2 dark:border-black-92.5 dark:bg-black-100",
        className,
      )}
    >
      <div className="mx-auto text-table-base font-normal text-black-100 dark:text-black-10">
        {table.getShowTitle()}
      </div>

      <div className="flex gap-1">
        {tableActions
          .filter((action) => !action.isHidden)
          .map((action) => (
            <Button
              key={action.name}
              className="border border-solid border-blue-100 bg-transparent py-2 !text-blue-100"
              onClick={() => action.onAction(table)}
            >
              {action.name}
            </Button>
          ))}
      </div>
    </div>
  );
}
