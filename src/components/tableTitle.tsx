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
  const title = table.options.layout.showTitle;
  return (
    <div
      className={clsx(
        "flex h-11 shrink-0 items-center justify-between bg-surface-overlay px-3 py-2 b-b dark:bg-surface",
        className,
      )}
    >
      <div className="mx-auto font-normal text">{title}</div>

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
