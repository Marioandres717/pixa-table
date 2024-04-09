import { HTMLProps, useEffect, useMemo, useRef, useState } from "react";
import TableBase from "./components/tableBase";
import TableAnomali, { AnomaliData } from "./templates/anomali";
import {
  PaginationState,
  RowSelectionState,
  TableOptions,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { DEFAULT_TABLE_CONFIG } from "./configs/table.config";

function App() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [data, setData] = useState<AnomaliData[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const columnHelper = createColumnHelper<AnomaliData>();

  const config = useMemo<TableOptions<AnomaliData>>(
    () => ({
      ...DEFAULT_TABLE_CONFIG,
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      enableRowSelection: true,
      state: { pagination, rowSelection },
      onPaginationChange: setPagination,
      onRowSelectionChange: setRowSelection,

      columns: [
        columnHelper.display({
          id: "selection",
          maxSize: 40,
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
    [pagination, data, columnHelper, rowSelection]
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

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}
