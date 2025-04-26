import { Table } from "@tanstack/react-table";
import { SelectionAction } from "../features";

type SelectedItemsToolbarProps<TData> = {
  table: Table<TData>;
};

export function SelectedItemsToolbar<TData>({
  table,
}: SelectedItemsToolbarProps<TData>) {
  const numOfItemsSelected = Object.keys(table.getState().rowSelection).length;
  const actions = table.getSelectionActions();

  const handleAction = (action: SelectionAction) => {
    action.onAction(table.getSelectedRowModel().rows, table);
  };

  const isActionHidden = (action: SelectionAction) => {
    return typeof action.isHidden === "function"
      ? action.isHidden(table.getSelectedRowModel().rows)
      : action.isHidden || false;
  };

  return (
    <div className="flex w-full items-center justify-between">
      <span role="status" className="font-medium text-white">
        {numOfItemsSelected} {numOfItemsSelected > 1 ? "Items" : "Item"}{" "}
        Selected
      </span>

      <div className="flex items-center gap-2">
        {actions.map((action) => {
          return (
            <button
              key={action.name}
              className="rounded bg-transparent py-1 capitalize text-white"
              style={{
                display: isActionHidden(action) ? "none" : "inherit",
              }}
              onClick={() => handleAction(action)}
            >
              {action.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
