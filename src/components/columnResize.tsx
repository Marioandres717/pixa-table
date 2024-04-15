import { Header } from "@tanstack/react-table";

import styles from "./columnResize.module.css";

type Props<T> = {
  header: Header<T, unknown>;
};

export function ColumnResize<T>({ header }: Props<T>) {
  return (
    <div
      {...{
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: `${styles.resizer} ${
          header.column.getIsResizing() ? styles["is-resizing"] : ""
        }`,
      }}
    />
  );
}
