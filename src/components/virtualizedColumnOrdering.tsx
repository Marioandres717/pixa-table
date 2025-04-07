import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useRef, useState } from "react";
import { Column, Table } from "@tanstack/react-table";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import { DraggableColumn } from "./columnDraggable";

type Props<T> = {
  table: Table<T>;
};

export function VirtualizedColumnOrdering<T>({ table }: Props<T>) {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [draggedItem, setdraggedItem] = useState<
    (Column<T> & VirtualItem) | null
  >(null);
  const { columnOrder } = table.getState();
  const columns = table.getAllColumns();

  const sortedColumns: Column<T, unknown>[] =
    columnOrder.length > 0
      ? columnOrder
          .map((colId) => columns.find((col) => col.id === colId))
          .filter((col): col is Column<T, unknown> => !!col)
      : columns;

  const columnVirtualizer = useVirtualizer({
    count: sortedColumns.length,
    getScrollElement: () => scrollableRef.current,
    getItemKey: (index) => sortedColumns[index].id.toString(),
    estimateSize: () => 36,
    gap: 4,
    paddingStart: 8,
    paddingEnd: 8,
  });

  const viColumns = columnVirtualizer.getVirtualItems();

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
      const { setColumnOrder } = table;
      setColumnOrder((items) => {
        if (items.length === 0) {
          items = table.getAllColumns().map((col) => col.id.toString());
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
    setdraggedItem(null);
  }

  // Add dragged item to virtual items if it's not in virtual items, so it can be visible while dragging
  const VirtualItemIsInView = viColumns.find((c) => c.key === draggedItem?.key);
  if (!VirtualItemIsInView && draggedItem) {
    const { key, size, start, index, end, lane } = draggedItem;
    viColumns.push({
      key,
      size,
      start,
      index,
      end,
      lane,
    });
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
      <SortableContext items={sortedColumns}>
        <div
          ref={scrollableRef}
          className="max-h-[346px] overflow-y-auto overflow-x-hidden rounded bg-surface-overlay b dark:bg-surface"
        >
          <div
            className="relative"
            style={{ height: columnVirtualizer.getTotalSize() }}
          >
            {viColumns.map((c) => {
              const col = sortedColumns.find((col) => col.id === c.key);
              if (!col) return null;
              return (
                <DraggableColumn
                  key={c.key.toString()}
                  column={{ ...col, ...c }}
                  setDraggedItem={setdraggedItem}
                  table={table}
                />
              );
            })}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
