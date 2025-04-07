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
        "pxt-border-cell sticky right-0 z-30 h-9 bg-transparent px-3 py-2 group-hover:bg-black-10 dark:group-hover:bg-black-90",
        {
          "h-full items-start group-hover:bg-interaction-hover":
            row.getIsExpanded(),
          "group-hover:active-bg": row.getIsSelected(),
        },
        className,
      )}
      data-active={row.getIsSelected()}
    >
      <div
        className={clsx(
          "flex items-center justify-end gap-1 whitespace-nowrap",
          {
            "opacity-0": displayOnhover,
            "group-hover:opacity-100": displayOnhover,
            "items-start": row.getIsExpanded(),
          },
        )}
      >
        {rowActions
          .filter(({ isHidden }) =>
            typeof isHidden === "function" ? !isHidden(row) : !isHidden,
          )
          .map(({ Component, onAction, name }) => (
            <Component key={name} row={row} onClick={() => onAction(row)} />
          ))}
      </div>
    </div>
  );
}
