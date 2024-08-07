import { useEffect, useMemo, useState } from "react";
import {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ExpandedState,
  PaginationState,
  RowSelectionState,
  TableOptions,
  VisibilityState,
  createColumnHelper,
  getExpandedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  IndeterminateCheckbox,
  ExpandableColumn,
  PixaTable,
  ResizableDiv,
} from "./components";
import { usePixaTable } from "./hooks";
import { MockDataManyCols } from "./mocks/handlers/mockMany";
import { MockData } from "./mocks/handlers/mockData";

const columnHelper = createColumnHelper<MockDataManyCols>();

function App() {
  const [data, setData] = useState<MockData[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["expander", "selection"],
    right: ["action", "custom"],
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const config = useMemo<Partial<TableOptions<MockDataManyCols>>>(
    () => ({
      getExpandedRowModel: getExpandedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      manualPagination: false,
      enableRowSelection: true,
      enableExpanding: true,
      state: {
        pagination,
        rowSelection,
        columnVisibility,
        expanded,
        columnOrder,
        columnFilters,
        columnPinning,
      },
      onPaginationChange: setPagination,
      onRowSelectionChange: setRowSelection,
      onExpandedChange: setExpanded,
      onColumnOrderChange: setColumnOrder,
      onColumnVisibilityChange: setColumnVisibility,
      onColumnFiltersChange: setColumnFilters,
      onColumnPinningChange: setColumnPinning,
      columns: [
        columnHelper.display({
          id: "expander",
          maxSize: 40,
          enableSorting: false,
          enableResizing: false,
          meta: {
            className: "border-r-0",
          },
          cell: ({ row }) => (
            <ExpandableColumn
              isExpanded={row.getIsExpanded()}
              toggleExpanded={() => row.toggleExpanded()}
            />
          ),
        }),
        columnHelper.display({
          id: "selection",
          maxSize: 50,
          enableSorting: false,
          enableResizing: false,
          enableHiding: false,
          meta: {
            className: "border-r-0 px-0",
          },
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

        ...Array.from({ length: 22 }).map((_, i) =>
          columnHelper.accessor(`col${i}`, {
            id: `col${i}`,
            header: `Col ${i}`,
            minSize: 50,
            maxSize: 200,
            enableSorting: true,
            enableResizing: true,
          }),
        ),
        columnHelper.display({
          id: "action",
          maxSize: 100,
          enableSorting: false,
          enableResizing: false,
          enableHiding: false,
          header: "actions",
          cell: ({ row }) => (
            <div className="tra flex justify-center">
              <button
                className="rounded bg-transparent py-1 text-white"
                onClick={() => alert(row.id)}
              >
                Click
              </button>
            </div>
          ),
        }),
        columnHelper.display({
          id: "custom",
          maxSize: 100,
          enableSorting: false,
          enableResizing: false,
          enableHiding: false,
          header: "custom",
          cell: ({ row }) => (
            <div className="flex justify-center">
              <button
                className="rounded bg-transparent px-2 text-white"
                onClick={() => alert(row.id)}
              >
                OOBAR
              </button>
            </div>
          ),
        }),
      ],
      data: data,
    }),
    [
      pagination,
      data,
      rowSelection,
      columnVisibility,
      expanded,
      columnOrder,
      columnFilters,
      columnPinning,
    ],
  );

  const table = usePixaTable(config);

  useEffect(() => {
    // eslint-disable-next-line no-constant-condition
    if (false) {
      fetchData({ skip: 0, limit: 100, fetchSize: 10 }).then((data) =>
        setData(data),
      );
    }

    fetchManyColsData({ skip: 0, limit: 2000, cols: 22, rows: 1000 }).then(
      (data) => setData(data),
    );
  }, []);

  return (
    <ResizableDiv
      renderProps={() => (
        <PixaTable
          table={table}
          loading={false}
          hideHeader={false}
          theme={"dark"}
          expandableRowComponent={() => <h1 className="p-4">foobar</h1>}
        />
      )}
    />
  );
}

const fetchData = async ({
  skip = 0,
  limit = 10,
  fetchSize = 100,
}: {
  skip: number;
  limit: number;
  fetchSize: number;
}) => {
  const response = await fetch(
    "/api?skip=" + skip + "&limit=" + limit + "&fetchSize=" + fetchSize,
  );
  const data = await response.json();
  return data;
};

const fetchManyColsData = async ({
  skip = 0,
  limit = 10,
  cols = 22,
  rows = 10,
}: {
  skip: number;
  limit: number;
  cols: number;
  rows: number;
}) => {
  const response = await fetch(
    "/api-many-cols?skip=" +
      skip +
      "&limit=" +
      limit +
      "&cols=" +
      cols +
      "&rows=" +
      rows,
  );
  const data = await response.json();
  return data;
};

export default App;
