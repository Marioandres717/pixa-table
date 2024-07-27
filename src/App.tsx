import { useEffect, useMemo, useState } from "react";
import {
  ColumnFiltersState,
  ColumnOrderState,
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
import { MockData, MockDataManyCols } from "./mocks/handlers";
import { usePixaTable } from "./hooks";

// const columnHelper = createColumnHelper<MockData>();
const columnHelper = createColumnHelper<MockDataManyCols>();

function App() {
  const [data, setData] = useState<MockData[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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
      },
      onPaginationChange: setPagination,
      onRowSelectionChange: setRowSelection,
      onExpandedChange: setExpanded,
      onColumnOrderChange: setColumnOrder,
      onColumnVisibilityChange: setColumnVisibility,
      onColumnFiltersChange: setColumnFilters,
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
            maxSize: 200,
            enableSorting: true,
            enableResizing: true,
          }),
        ),
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
          loading={false}
          hideHeader={false}
          theme={"dark"}
          tableInstance={table}
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
