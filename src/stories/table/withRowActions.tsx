import { createColumnHelper, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { usePixaTable } from "../../hooks";
import { MockDataColumnDefs, MockData } from "../../mocks/handlers/mockData";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { RowAction } from "../../features";

export const columnHelper = createColumnHelper<MockData>();

export const TableWithRowActions: Story = {
  decorators: [
    (Story, context) => {
      const rowActions = useMemo<RowAction[]>(() => {
        return [
          {
            type: "delete",
            Component: ({ row, onClick }) => (
              <span onClick={() => onClick(row)}>Delete</span>
            ),
            onAction: (data) => {
              // eslint-disable-next-line no-console
              console.info(data);
            },
          },
          {
            type: "edit",
            // isHidden: (data) => true,
            onAction: (data) => {
              // eslint-disable-next-line no-console
              console.log(data);
            },
            Component: ({ row, onClick }) => (
              <span onClick={() => onClick(row)}>Edit</span>
            ),
          },
          {
            type: "clone",
            onAction: (data) => {
              // eslint-disable-next-line no-console
              console.log(data);
            },
            Component: ({ row, onClick }) => (
              <span onClick={() => onClick(row)}>Clone</span>
            ),
          },
        ];
      }, []);

      const config = useMemo<UsePixaTableOptions>(
        () => ({
          theme: context.globals.theme,
          selectable: false,
          data: context.loaded.data,
          enableRowActions: true,
          columns: MockDataColumnDefs,
          rowActions,
        }),
        [context.loaded.data, rowActions, context.globals.theme],
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
