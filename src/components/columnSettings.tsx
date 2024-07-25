import { Table } from "@tanstack/react-table";
import { ColumnOrdering } from "./columnOrdering";

type Props<TData> = {
  show: boolean;
  tableInstance: Table<TData>;
  onClick: () => void;
  parentRef: React.RefObject<HTMLDivElement>;
};

export default function ColumnSettings<TData>({
  show = false,
  onClick,
  tableInstance,
  parentRef,
}: Props<TData>) {
  const parentHeight = parentRef.current?.offsetHeight ?? 0;

  return (
    <>
      <button
        onClick={onClick}
        type="button"
        tabIndex={-1}
        role="tab"
        className={`h-full max-h-36 w-full cursor-pointer dark:border-black-92.5 ${show ? "border-b dark:bg-black-140" : ""}`}
      >
        <div className="rotate-90">Columns</div>
      </button>
      {show && (
        <div
          className={`absolute left-0 top-0 z-20 w-64 -translate-x-64 rounded border p-4 dark:border-black-90 dark:bg-black-95 dark:drop-shadow-[0_7px_20px_0_rgba(13,22,26,0.15)]`}
          style={{ height: `${parentHeight}px` }}
        >
          <div className="mb-2 font-semibold">Table Settings</div>
          <div>Column order & visibility</div>
          {/*  -80 for the Table settings header */}
          <ColumnOrdering
            tableInstance={tableInstance}
            maxHeight={parentHeight - 80}
          />
        </div>
      )}
    </>
  );
}
