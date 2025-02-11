import { Header, HeaderGroup, RowData, Table } from "@tanstack/react-table";
import { tableHeaderGridGenerator } from "../utils";
import { HeaderCell } from "./headerCell";

type Props<TData> = { table: Table<TData>; headerGroup: HeaderGroup<TData> };

export function HeaderRow<TData>({
  table,
  headerGroup: { headers },
}: Props<TData>) {
  const { enableRowActions } = table.options;
  return (
    <div
      role="row"
      className="grid h-8 min-w-full bg-black-5 dark:border-black-92.5 dark:bg-black-95"
      style={{
        gridTemplateColumns: tableHeaderGridGenerator(headers),
        width: calculateRowWidth(headers, enableRowActions),
      }}
    >
      {headers.map((header) => (
        <HeaderCell key={header.id} header={header} state={table.getState()} />
      ))}
    </div>
  );
}

function calculateRowWidth<TData>(
  headers: Header<TData, RowData>[],
  enableRowActions: boolean,
) {
  const rowWidth = headers.reduce((acc, header) => acc + header.getSize(), 0);
  if (enableRowActions) {
    return rowWidth + 112 /* max width for row actions */;
  }
  return rowWidth;
}
