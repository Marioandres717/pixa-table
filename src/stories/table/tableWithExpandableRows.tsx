import { createColumnHelper, Table } from "@tanstack/react-table";
import { useMemo } from "react";
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
        <Story
          args={{
            table: table as Table<unknown>,
            expandableRowComponent: () => <h1>ExpandableRow</h1>,
          }}
        />
      );
    },
  ],
};
