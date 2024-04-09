import { useEffect, useMemo, useState } from "react";
import TableBase from "./components/tableBase";
import TableAnomali, { AnomaliData } from "./templates/anomali";
import {
  PaginationState,
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

  const columnHelper = createColumnHelper<AnomaliData>();

  const config = useMemo<TableOptions<AnomaliData>>(
    () => ({
      ...DEFAULT_TABLE_CONFIG,
      state: { pagination },
      onPaginationChange: setPagination,
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      columns: [
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
    [pagination, data, columnHelper]
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
