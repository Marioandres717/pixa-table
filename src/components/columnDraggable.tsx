import { useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Column } from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";
import { IndeterminateCheckbox } from "./checkbox";
import { Icon } from "./icon";

type DraggableColumnProps<TData> = {
  column: Column<TData> & VirtualItem<Element>;
  setDraggedItem: (item: (Column<TData> & VirtualItem<Element>) | null) => void;
};

export function DraggableColumn<T>({
  column,
  setDraggedItem,
}: DraggableColumnProps<T>) {
  const {
    getCanHide,
    getIsVisible,
    getToggleVisibilityHandler,
    columnDef,
    index,
    size,
    start,
  } = column;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
      strategy: verticalListSortingStrategy,
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

  const columnLabel =
    typeof columnDef.header === "string" ? columnDef.header : columnDef.id;

  return (
    <div
      data-index={index}
      ref={setNodeRef}
      className={clsx(
        "absolute flex w-[190px] cursor-move items-center justify-between gap-3 rounded-sm py-[6px] pl-[6px] pr-2",
        getIsVisible() ? "dark:bg-black-92.5" : "dark:bg-black-95",
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
          }}
        />
        <span
          title={columnLabel}
          className="overflow-hidden text-ellipsis text-nowrap leading-[initial]"
        >
          {columnLabel}
        </span>
      </div>
      <Icon
        icon="reorder"
        className="!h-3 !w-3 flex-shrink-0 dark:fill-black-85"
      />
    </div>
  );
}
