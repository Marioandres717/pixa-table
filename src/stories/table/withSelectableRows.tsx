import { createColumnHelper, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { IndeterminateCheckbox } from "../../components";
import { SelectionAction } from "../../features";
import { usePixaTable } from "../../hooks";
import { MockDataColumnDefs, MockData } from "../../mocks/handlers/mockData";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";

export const columnHelper = createColumnHelper<MockData>();

export const TableWithSelectableRows: Story = {
  decorators: [
    (Story, context) => {
      const selectionActions = useMemo<SelectionAction[]>(() => {
        return [
          {
            type: "delete",
            onAction: (data) => {
              // eslint-disable-next-line no-console
              console.info("delete", data);
            },
          },
          {
            type: "edit",
            isHidden: (data) => data.length > 1,
            onAction: (data) => {
              // eslint-disable-next-line no-console
              console.log("edit", data);
            },
          },
        ];
      }, []);
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          theme: context.globals.theme,
          selectable: true,
          data: context.loaded.data,
          enableSelectionActions: true,
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
          state: {
            columnPinning: {
              left: ["selection"],
            },
            selectionActions: selectionActions,
          },
        }),
        [context.loaded.data, selectionActions, context.globals.theme],
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
