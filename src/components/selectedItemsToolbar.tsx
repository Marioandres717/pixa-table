import { Table } from "@tanstack/react-table";

type SelectedItemsToolbarProps<TData> = {
  table: Table<TData>;
};

export function SelectedItemsToolbar<TData>({
  table,
}: SelectedItemsToolbarProps<TData>) {
  const numOfItemsSelected = Object.keys(table.getState().rowSelection).length;

  const actions = table.getSelectionActions();
  return (
    <div className="flex w-full items-center justify-between">
      <span className="dark:text-white-50 font-medium text-black-10">
        {numOfItemsSelected} {numOfItemsSelected > 1 ? "Items" : "Item"}{" "}
        Selected
      </span>

      <div className="flex items-center gap-2">
        {actions.map((action) => {
          const isActionHidden =
            typeof action.isHidden === "function"
              ? action.isHidden(table.getSelectedRowModel().rows)
              : action.isHidden || false;

          return (
            <button
              key={action.type}
              className="rounded bg-transparent py-1 capitalize text-white"
              style={{
                display: isActionHidden ? "none" : "inherit",
              }}
              onClick={() =>
                table.onSelectionAction(
                  action,
                  table.getSelectedRowModel().rows,
                )
              }
            >
              {action.type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
