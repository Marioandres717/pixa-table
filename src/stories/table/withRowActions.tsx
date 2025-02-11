import { createColumnHelper, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { usePixaTable } from "../../hooks";
import { MockDataColumnDefs, MockData } from "../../mocks/handlers/mockData";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { RowAction } from "../../features";
import { IndeterminateCheckbox } from "../../components";

export const columnHelper = createColumnHelper<MockData>();

export const TableWithRowActions: Story = {
  decorators: [
    (Story, context) => {
      const rowActions = useMemo<RowAction[]>(() => {
        return [
          {
            name: "delete",
            Component: ({ row, onClick }) => (
              <span onClick={() => onClick(row)}>Delete</span>
            ),
            onAction: (data) => {
              // eslint-disable-next-line no-console
              console.info(data);
            },
          },
          {
            name: "edit",
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
            name: "clone",
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
          data: context.loaded.data,
          enableRowActions: true,
          columns: [
            columnHelper.display({
              id: "selection",
              maxSize: 50,
              enableSorting: false,
              enableResizing: false,
              enableHiding: false,
              meta: {
                className: "border-r-0 px-0",
              },
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
            ...MockDataColumnDefs,
          ],
          rowActions,
          enableRowSelection: true,
          state: {
            columnPinning: {
              left: ["selection"],
            },
            rowSelection: {
              "0": true,
              "1": true,
            },
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
