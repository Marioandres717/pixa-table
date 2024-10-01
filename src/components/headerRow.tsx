import { HeaderGroup, Table } from "@tanstack/react-table";
import { gridGenerator } from "../utils";
import { HeaderCell } from "./headerCell";

type Props<TData> = { table: Table<TData>; headerGroup: HeaderGroup<TData> };

export function HeaderRow<TData>({ table, headerGroup }: Props<TData>) {
  const cols = table.getVisibleFlatColumns();
  // const { left, right } = useMemo(() => getPinnedCols(cols), [cols]);

  return (
    <div
      key={headerGroup.id}
      role="row"
      className="grid h-8 min-w-full border-b border-black-20 bg-black-5 dark:border-black-92.5 dark:bg-black-95"
      style={{
        gridTemplateColumns: gridGenerator(table),
        width: cols.reduce((acc, col) => acc + col.getSize(), 0),
      }}
    >
      {/* LEFT PINNED COLS */}
      {/* <div className="sticky left-0 top-0 z-10 h-full bg-inherit">
        {headerGroup.headers
          .filter((header) => header.column.getIsPinned() === "left")
          .map((header) => (
            <HeaderCell
              key={header.id}
              header={header}
              state={table.getState()}
            />
          ))}
      </div> */}

      {/* NON-PINNED COLS */}
      {/* <div className="h-full w-full"> */}
      {headerGroup.headers
        // .filter((header) => !header.column.getIsPinned())
        .map((header) => (
          <HeaderCell
            key={header.id}
            header={header}
            state={table.getState()}
          />
        ))}
      {/* </div> */}

      {/* RIGHT PINNED COLS */}
      {/* <div className="sticky right-0 top-0 z-10 h-full bg-inherit">
        {headerGroup.headers
          .filter((header) => header.column.getIsPinned() === "right")
          .map((header) => (
            <HeaderCell
              key={header.id}
              header={header}
              state={table.getState()}
            />
          ))}
      </div> */}
    </div>
  );
}
