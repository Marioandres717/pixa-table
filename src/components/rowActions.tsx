import { Row } from "@tanstack/react-table";
import clsx from "clsx";

type Props<TData> = {
  row: Row<TData>;
  displayOnhover?: boolean;
  className?: string;
};

export default function RowActions<TData>({
  row,
  className,
  displayOnhover = true,
}: Props<TData>) {
  const rowActions = row.getRowActions();
  return (
    <div
      role="cell"
      className={clsx(
        "sticky right-0 z-30 flex h-[35px] max-w-fit gap-1 bg-inherit px-3 py-2",
        {
          "opacity-0": displayOnhover,
          "group-hover:opacity-100": displayOnhover,
        },
        className,
      )}
    >
      {rowActions
        .filter(({ isHidden }) =>
          typeof isHidden === "function" ? !isHidden(row) : !isHidden,
        )
        .map(
          ({ Component, onAction }, i) =>
            Component && (
              <Component key={i} row={row} onClick={() => onAction(row)} />
            ),
        )}
    </div>
  );
}
