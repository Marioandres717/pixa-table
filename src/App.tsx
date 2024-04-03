import { useEffect, useState } from "react";
import TableBase from "./components/tableBase";
import TableAnomali, { AnomaliData } from "./components/tableAnomali";
import { TableOptions, createColumnHelper } from "@tanstack/react-table";
import { DEFAULT_TABLE_CONFIG } from "./configs/table.config";

function App() {
  const columnHelper = createColumnHelper<AnomaliData>();

  const [config, setConfig] = useState<TableOptions<AnomaliData>>({
    ...DEFAULT_TABLE_CONFIG,
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
  });

  useEffect(() => {
    fetchData().then((data) => setConfig((config) => ({ ...config, data })));
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
