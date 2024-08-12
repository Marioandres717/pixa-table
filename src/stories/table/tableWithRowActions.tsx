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
              console.log("edit", data);
            },
          },
        ];
      }, []);
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          selectable: false,
          data: context.loaded.data,
          enableRowActions: true,
          columns: [
            columnHelper.display({
              id: "action",
              size: 100,
              enableSorting: false,
              enableResizing: false,
              enableHiding: false,
              header: "",
              cell: ({ row }) => {
                // debugger;
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
        [context.loaded.data, rowActions],
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
