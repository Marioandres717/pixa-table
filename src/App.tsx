import { useEffect, useMemo, useState } from "react";
import { TableBase, IndeterminateCheckbox, ExpandableRow } from "./components";
import { TableAnomali } from "./templates";
import {
  ColumnOrderState,
  ExpandedState,
  PaginationState,
  RowSelectionState,
  TableOptions,
  VisibilityState,
  createColumnHelper,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { DEFAULT_TABLE_CONFIG } from "./configs/table.config";
import { cols } from "./mocks/handlers";

const columnHelper = createColumnHelper<AnomaliData>();

export type AnomaliData = {
  name: string;
  company: string;
  location: string;
  date: string;
  nested: {
    foo: string;
    bar: string;
  };
};

function App() {
  const [data, setData] = useState<AnomaliData[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const config = useMemo<TableOptions<AnomaliData>>(
    () => ({
      ...DEFAULT_TABLE_CONFIG,
      getExpandedRowModel: getExpandedRowModel(),
      manualPagination: false,
      enableRowSelection: true,
      enableExpanding: true,
      state: {
        pagination,
        rowSelection,
        columnVisibility,
        expanded,
        columnOrder,
      },
      onPaginationChange: setPagination,
      onRowSelectionChange: setRowSelection,
      onExpandedChange: setExpanded,
      onColumnOrderChange: setColumnOrder,
      onColumnVisibilityChange: setColumnVisibility,
      columns: [
        columnHelper.display({
          id: "expander",
          maxSize: 30,
          enableSorting: false,
          enableResizing: false,
          header: () => <div style={{ width: 15 }} />,
          cell: ({ row }) => (
            <ExpandableRow
              isExpanded={row.getIsExpanded()}
              toggleExpanded={() => row.toggleExpanded()}
            />
          ),
        }),
        columnHelper.display({
          id: "selection",
          maxSize: 40,
          enableSorting: false,
          enableResizing: false,
          enableHiding: false,
          header({ table }) {
            return (
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />
            );
          },
          cell({ row }) {
            return (
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />
            );
          },
        }),
        ...cols,
      ],
      data: data,
    }),
    [pagination, data, rowSelection, columnVisibility, expanded, columnOrder]
  );

  useEffect(() => {
    fetchData({ skip: 0, limit: 100 }).then((data) => setData(data));
  }, []);

  return (
    <TableBase options={config}>
      {(table) => (
        <TableAnomali
          theme={"light"}
          tableInstance={table}
          expandableRowComponent={() => <h1>FOOBAR</h1>}
        />
      )}
    </TableBase>
  );
}

const fetchData = async ({
  skip = 0,
  limit = 10,
}: {
  skip: number;
  limit: number;
}) => {
  const response = await fetch("/api?skip=" + skip + "&limit=" + limit);
  const data = await response.json();
  return data;
};

export default App;
