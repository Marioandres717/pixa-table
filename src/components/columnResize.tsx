import { Header } from "@tanstack/react-table";

type Props<T> = {
  header: Header<T, unknown>;
};

export function ColumnResize<T>({ header }: Props<T>) {
  const {
    column: { getIsResizing },
    getResizeHandler,
  } = header;
  return (
    <div
      className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none opacity-0 hover:opacity-100 ${getIsResizing() ? "bg-aqua-120 dark:bg-aqua-100" : "bg-black-85"}`}
      {...{
        onMouseDown: getResizeHandler(),
        onTouchStart: getResizeHandler(),
      }}
    />
  );
}
