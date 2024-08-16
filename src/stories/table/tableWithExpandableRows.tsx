import { createColumnHelper, Table } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { ExpandableColumn } from "../../components";
import { usePixaTable } from "../../hooks";
import { MockDataColumnDefs, MockData } from "../../mocks/handlers/mockData";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";

export const columnHelper = createColumnHelper<MockData>();

export const TableWithExpandableRows: Story = {
  decorators: [
    (Story, context) => {
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          expandable: true,
          theme: context.globals.theme,
          data: context.loaded.data,
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
            ...MockDataColumnDefs,
          ],
          state: {
            columnPinning: {
              left: ["expander"],
            },
          },
        }),
        [context.loaded.data, context.globals.theme],
      );
      const table = usePixaTable<MockData>(config);
      return (
        <div className="h-[500px]">
          <Story
            args={{
              table: table as Table<unknown>,
              expandableRowComponent: () => <ExpandableRow />,
            }}
          />
        </div>
      );
    },
  ],
};

const ExpandableRow = () => {
  const [data, setData] = useState<MockData[]>([]);

  useEffect(() => {
    fetchData().then((data) => {
      setData(data.data);
    });
  }, []);

  async function fetchData() {
    const response = await fetch(
      "/api/mock-data?skip=" + 0 + "&limit=" + 100 + "&fetchSize=" + 100,
    );
    const data = await response.json();
    return { data };
  }
  return (
    <div className="p-4">
      <h1>Expandable Row</h1>
      <ul>
        {data.map((d) => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
    </div>
  );
};
