import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Column, Table } from "@tanstack/react-table";
import { CSSProperties, PropsWithChildren } from "react";
import "./columnOrdering.css";
import IndeterminateCheckbox from "./checkbox";

type Props<T> = {
  tableInstance: Table<T>;
};

export default function ColumnOrdering<T>({ tableInstance }: Props<T>) {
  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === "droppable") {
      return;
    }
  }
  return (
    // <DndContext onDragEnd={handleDragEnd}>
    <Droppable>
      {tableInstance
        .getAllColumns()
        .filter(
          (col) =>
            col.columnDef.id !== "expander" && col.columnDef.id !== "selection"
        )
        .map((col) => (
          <DraggableColumn key={col.id} column={col} />
        ))}
    </Droppable>
    // </DndContext>
  );
}

type DroppableColumnProps = PropsWithChildren<{}>;

function Droppable({ children }: DroppableColumnProps) {
  //   const { setNodeRef } = useDroppable({
  //     id: "column",
  //   });
  const style: CSSProperties = {
    width: "100%",
    height: "100%",
  };
  return (
    // <div ref={setNodeRef} style={style}>
    <div style={style}>{children}</div>
  );
}

type DraggableColumnProps<T> = { column: Column<T> };

function DraggableColumn<T>({ column }: DraggableColumnProps<T>) {
  const { getCanHide, getIsVisible, getToggleVisibilityHandler } = column;
  //   const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //     id: column.id,
  //   });

  //   const style = transform
  //     ? {
  //         transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //       }
  //     : undefined;

  return (
    // <div
    //   ref={setNodeRef}
    //   className="draggable-column"
    //   style={style}
    //   {...listeners}
    //   {...attributes}
    // >
    // <div className="draggable-column" style={style}>
    <div className="draggable-column">
      <div className="column-visibility">
        <IndeterminateCheckbox
          {...{
            disabled: !getCanHide(),
            checked: getIsVisible(),
            onChange: getToggleVisibilityHandler(),
          }}
        />
        <span>{column.columnDef.header?.toString()}</span>
      </div>
      <span className="drag"></span>
    </div>
  );
}
