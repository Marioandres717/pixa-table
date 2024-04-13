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

import IndeterminateCheckbox from "./checkbox";
import styles from "./columnOrdering.module.css";



type Props<T> = {
  tableInstance: Table<T>;
};

export default function ColumnOrdering<T>({ tableInstance }: Props<T>) {
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
    })
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
        {sortedColumns.map((col) => (
          <DraggableColumn key={col.id} column={col} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

type DraggableColumnProps<T> = { column: Column<T> };

function DraggableColumn<T>({ column }: DraggableColumnProps<T>) {
  const { getCanHide, getIsVisible, getToggleVisibilityHandler } = column;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className={styles["draggable-column"]}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className={styles["column-visibility"]}>
        <IndeterminateCheckbox
          {...{
            disabled: !getCanHide(),
            checked: getIsVisible(),
            onChange: getToggleVisibilityHandler(),
          }}
        />
        <span>{column.columnDef.header?.toString()}</span>
      </div>
      <span className={styles["drag"]}></span>
    </div>
  );
}
