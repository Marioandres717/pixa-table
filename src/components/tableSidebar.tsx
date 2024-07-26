import classNames from "classnames";
import { useRef, useState } from "react";
import ColumnSettings from "./columnSettings";
import { Table } from "@tanstack/react-table";

type Props<TData> = {
  tableInstance: Table<TData>;
  className?: string;
};

export default function TableSidebar<TData>({
  className,
  tableInstance,
}: Props<TData>) {
  const ref = useRef<HTMLDivElement>(null);
  const [tabSelected, setTabSelected] = useState<"columns" | "">("");

  return (
    <div
      ref={ref}
      className={classNames(
        "relative flex flex-col border-l dark:border-black-92.5",
        className,
      )}
    >
      <ColumnSettings
        parentRef={ref}
        show={tabSelected === "columns"}
        tableInstance={tableInstance}
        onClick={() =>
          setTabSelected((prev) => (prev === "columns" ? "" : "columns"))
        }
      />
    </div>
  );
}
