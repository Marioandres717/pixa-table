import { Table } from "@tanstack/react-table";
import { usePixaTable } from "../../hooks";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { MockData, MockDataColumnDefs } from "../../mocks/handlers/mockData";
import { useMemo } from "react";
import { PageSize } from "../../components";

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
              <PageSize
                table={table}
                className="w-20 cursor-pointer rounded-[3px] px-2 py-1 focus:ring-1 dark:border-black-80 dark:bg-peach-100 dark:text-blue-60"
                pageOptions={[10, 25, 50, 100, 250, 500, 1000, 5000]}
              />
            ),
          },
        }),
        [context.loaded.data, context.globals.theme],
      );
      const table = usePixaTable<MockData>(config);

      return (
        <Story
          args={{
            ...context.args,
            table: table as Table<unknown>,
          }}
        />
      );
    },
  ],
};
