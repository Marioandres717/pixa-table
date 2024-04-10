import { Header } from "@tanstack/react-table";
import { PropsWithChildren } from "react";
import "./columnSort.css";

type Props<T> = PropsWithChildren<{
  header: Header<T, unknown>;
}>;

export default function ColumnSort<T>({ header, children }: Props<T>) {
  const { column } = header;
  const title = column.id !== "selection" ? column.columnDef.id : "";
  const sortDirection = column.getIsSorted();
  return (
    <div className="sortContent" title={title}>
      {children}
      <span>
        <span
          className={sortDirection === "asc" ? "arrowUp selected" : "arrowUp"}
        ></span>
        <span
          className={
            sortDirection === "desc" ? "arrowDown selected" : "arrowDown"
          }
        ></span>
      </span>
    </div>
  );
}
