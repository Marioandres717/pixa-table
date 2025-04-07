import { Header } from "@tanstack/react-table";
import clsx from "clsx";

type Props<T> = {
  header: Header<T, unknown>;
};

export function ColumnResize<T>({ header }: Props<T>) {
  const {
    column: { getIsResizing, getCanResize },
    getResizeHandler,
  } = header;
  if (!getCanResize()) return null;
  return (
    <div
      className={clsx(
        "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none opacity-0 hover:opacity-100",
        {
          "bg-interaction-accent": getIsResizing(),
          "bg-surface-inverted": !getIsResizing(),
        },
      )}
      {...{
        onMouseDown: getResizeHandler(),
        onTouchStart: getResizeHandler(),
      }}
    />
  );
}
