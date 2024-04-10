import { Header } from "@tanstack/react-table";

type Props<T> = {
  header: Header<T, unknown>;
};

export default function ColumnResize<T>({ header }: Props<T>) {
  return (
    <div
      {...{
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: `resizer ${
          header.column.getIsResizing() ? "isResizing" : ""
        }`,
      }}
    />
  );
}
