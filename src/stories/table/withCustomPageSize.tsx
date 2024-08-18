import { Table } from "@tanstack/react-table";
import { usePixaTable } from "../../hooks";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { MockData, MockDataColumnDefs } from "../../mocks/handlers/mockData";
import { useMemo } from "react";

export const TableWithCustomPageSize: Story = {
  decorators: [
    (Story, context) => {
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          data: context.loaded.data,
          columns: MockDataColumnDefs,
          theme: context.globals.theme,
          pluggableComponents: {
            PageSize: ({ table }) => (
              <select
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                value={table.getState().pagination.pageSize}
              >
                {[10, 25, 50, 100, 250].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ),
          },
        }),
        [context.loaded.data, context.globals.theme],
      );
      const table = usePixaTable<MockData>(config);

      return (
        <Story
          args={{
            table: table as Table<unknown>,
          }}
        />
      );
    },
  ],
};
