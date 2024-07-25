import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Column, Table } from "@tanstack/react-table";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import classNames from "classnames";

import { IndeterminateCheckbox } from "./checkbox";
import { Icon } from "./icon";

type Props<T> = {
  tableInstance: Table<T>;
  maxHeight?: number;
};

export function ColumnOrdering<T>({ tableInstance, maxHeight }: Props<T>) {
  const columns = tableInstance
    .getAllColumns()
    .filter((col) => col.id !== "selection" && col.id !== "expander");

  const { columnOrder } = tableInstance.getState();

  const sortedColumns: Column<T, unknown>[] =
    columnOrder.length > 0
      ? columnOrder
          .map((colId) => columns.find((col) => col.id === colId))
          .filter((col): col is Column<T, unknown> => !!col)
      : columns;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const { setColumnOrder } = tableInstance;
      setColumnOrder((items) => {
        if (items.length === 0) {
          items = tableInstance.getAllColumns().map((col) => col.id.toString());
        }
        if (!over) {
          return items;
        }
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());
        const t = arrayMove(items, oldIndex, newIndex);
        return t;
      });
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
      <SortableContext items={sortedColumns}>
        <div
          className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden rounded border p-2 dark:border-black-90 dark:bg-black-100"
          style={{ maxHeight }}
        >
          {sortedColumns.map((col) => (
            <DraggableColumn key={col.id} column={col} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

type DraggableColumnProps<T> = { column: Column<T> };

function DraggableColumn<T>({ column }: DraggableColumnProps<T>) {
  const { getCanHide, getIsVisible, getToggleVisibilityHandler, columnDef } =
    column;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
    });

  const style = transform
    ? {
        transform: `translate3d(0, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  const columnLabel =
    typeof columnDef.header === "string" ? columnDef.header : columnDef.id;

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        "flex h-9 cursor-move items-center justify-between gap-3 rounded-sm py-[6px] pl-[6px] pr-2",
        getIsVisible() ? "dark:bg-black-92.5" : "dark:bg-black-95",
      )}
      style={style}
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
