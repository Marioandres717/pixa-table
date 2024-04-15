import { useEffect, useMemo, useState } from "react";
import TableBase from "./components/tableBase";
import TableAnomali from "./templates/anomali";
import {
  ExpandedState,
  PaginationState,
  RowSelectionState,
  TableOptions,
  VisibilityState,
  createColumnHelper,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { DEFAULT_TABLE_CONFIG } from "./configs/table.config";
import IndeterminateCheckbox from "./components/checkbox";
import ExpandableRow from "./components/expandableRow";

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
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const config = useMemo<TableOptions<AnomaliData>>(
    () => ({
      ...DEFAULT_TABLE_CONFIG,
      getExpandedRowModel: getExpandedRowModel(),
      enableRowSelection: true,
      enableExpanding: true,
      state: {
        pagination,
        rowSelection,
        expanded,
        columnOrder,
        columnVisibility,
      },
      onPaginationChange: setPagination,
      onRowSelectionChange: setRowSelection,
      onExpandedChange: setExpanded,
      onColumnOrderChange: setColumnOrder,
      onColumnVisibilityChange: setColumnVisibility,
      columns: [
        columnHelper.display({
          id: "expander",
          maxSize: 20,
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
        columnHelper.accessor("name", {
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
          header: "Name",
        }),
        columnHelper.accessor("company", {
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
          header: "Company",
        }),
        columnHelper.accessor("location", {
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
          header: "Location",
        }),
        columnHelper.accessor("date", {
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
          header: "Date",
        }),
      ],
      data: data,
    }),
    [pagination, data, rowSelection, expanded, columnOrder, columnVisibility]
  );

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  return (
    <TableBase {...config}>{(table) => <TableAnomali {...table} />}</TableBase>
  );
}

const fetchData = async () => {
  const response = await fetch("/api");
  const data = await response.json();
  return data;
};

export default App;
