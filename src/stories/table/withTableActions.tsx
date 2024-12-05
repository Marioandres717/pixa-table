import { createColumnHelper, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { usePixaTable } from "../../hooks";
import { MockDataColumnDefs, MockData } from "../../mocks/handlers/mockData";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { TableAction } from "../../features/tableActions/types";

export const columnHelper = createColumnHelper<MockData>();

export const WithTableActions: Story = {
  decorators: [
    (Story, context) => {
      const tableActions = useMemo<TableAction<MockData>[]>(() => {
        return [
          {
            name: "action 1",
            onAction: (table) => {
              alert(table.getTableActions()[0].name);
            },
          },
          {
            name: "action 2",
            isHidden: false,
            onAction: () => {},
          },
          {
            name: "action 3",
            isHidden: true,
            onAction: () => {},
          },
        ];
      }, []);

      const config = useMemo<UsePixaTableOptions>(
        () => ({
          theme: context.globals.theme,
          enableTableActions: true,
          tableActions: tableActions,
          data: context.loaded.data,
          columns: MockDataColumnDefs,
          enableColumnOrdering: false,
          enableHiding: false,
        }),
        [context.loaded.data, tableActions, context.globals.theme],
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
