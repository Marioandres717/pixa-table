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
              <button onClick={() => onClick(row)}>Delete</button>
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
              <button onClick={() => onClick(row)}>Edit</button>
            ),
          },
          {
            type: "clone",
            onAction: (data) => {
              // eslint-disable-next-line no-console
              console.log(data);
            },
            Component: ({ row, onClick }) => (
              <button onClick={() => onClick(row)}>Clone</button>
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
          columns: [
            columnHelper.display({
              id: "action",
              // size: 100,
              enableSorting: false,
              enableResizing: false,
              enableHiding: false,
              header: "",
              cell: ({ row }) => {
                const actions = row.getRowActions();
                return (
                  <div className="flex gap-1">
                    {actions.map(({ Component, onAction, type }) => {
                      if (!Component) return null;
                      return (
                        <Component
                          key={type}
                          row={row}
                          onClick={() => onAction(row)}
                        />
                      );
                    })}
                  </div>
                );
              },
            }),
            ...MockDataColumnDefs,
          ],
          state: {
            columnPinning: {
              right: ["action"],
            },
            rowActions: rowActions,
          },
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
