import { useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Column, Table } from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";
import { IndeterminateCheckbox } from "./checkbox";
import { Icon } from "./icon";

type DraggableColumnProps<TData> = {
  column: Column<TData> & VirtualItem;
  setDraggedItem: (item: (Column<TData> & VirtualItem) | null) => void;
  table: Table<TData>;
};

export function DraggableColumn<T>({
  column,
  setDraggedItem,
  table,
}: DraggableColumnProps<T>) {
  const {
    getCanHide,
    getIsVisible,
    getToggleVisibilityHandler,
    index,
    size,
    start,
    id,
    columnDef,
  } = column;

  const columnId = typeof columnDef.header === "string" ? columnDef.header : id;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
      strategy: verticalListSortingStrategy,
      disabled: !table.options.enableColumnOrdering,
    });

  const styles = transform
    ? {
        top: start,
        left: 8,
        height: `${size}px`,
        transform: `translateY(${transform.y}px)`,
        transition,
      }
    : {
        height: `${size}px`,
        left: 8,
        top: start,
      };

  return (
    <div
      data-index={index}
      ref={setNodeRef}
      className={clsx(
        "absolute flex w-[204px] items-center justify-between gap-3 rounded-sm py-[6px] pl-[6px] pr-2",
        {
          "bg-surface dark:bg-surface-overlay": getIsVisible(),
          "bg-surface dark:bg-surface-elevated": !getIsVisible(),
          "cursor-move": table.options.enableColumnOrdering,
          "cursor-not-allowed": !table.options.enableColumnOrdering,
        },
      )}
      style={styles}
      onMouseDown={() => setDraggedItem(column)}
      onMouseUp={() => setDraggedItem(null)}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <IndeterminateCheckbox
          {...{
            disabled: !getCanHide(),
            checked: getIsVisible(),
            onChange: getToggleVisibilityHandler(),
            className: clsx({
              "cursor-pointer": table.options.enableHiding,
              "cursor-not-allowed": !table.options.enableHiding,
            }),
          }}
        />
        <span
          title={columnId}
          className="overflow-hidden text-ellipsis text-nowrap capitalize leading-[initial]"
        >
          {columnId}
        </span>
      </div>
      <Icon
        icon="reorder"
        className={clsx(
          "!h-3 !w-3 flex-shrink-0",
          getIsVisible() ? "dark:fill-black-85" : "dark:fill-black-80",
        )}
      />
    </div>
  );
}
