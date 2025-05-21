import clsx from "clsx";
import { useState } from "react";
import ColumnSettings from "./columnSettings";
import { Table } from "@tanstack/react-table";

type Props<TData> = {
  table: Table<TData>;
  className?: string;
};

export function TableSidebar<TData>({ className, table }: Props<TData>) {
  const [tabSelected, setTabSelected] = useState<"columns" | "">("");

  return (
    <div className={clsx("relative flex flex-col b-l", className)}>
      <ColumnSettings
        show={tabSelected === "columns"}
        table={table}
        onClick={() =>
          setTabSelected((prev) => (prev === "columns" ? "" : "columns"))
        }
      />
    </div>
  );
}
