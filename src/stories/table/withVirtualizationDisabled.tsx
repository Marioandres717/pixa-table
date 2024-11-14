import { createColumnHelper, Table } from "@tanstack/react-table";
import { usePixaTable } from "../../hooks";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { MockData, MockDataColumnDefs } from "../../mocks/handlers/mockData";
import { useMemo } from "react";
import { MockExpandableRow } from "../../mocks/handlers/mockExpandableRow";
import { ExpandableColumn } from "../../components";

const columnHelper = createColumnHelper<MockData>();

export const TableWithVirtualizationDisabled: Story = {
  decorators: [
    (Story, context) => {
      const config = useMemo<UsePixaTableOptions>(
        () => ({
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
          enableRowActions: true,
          rowActions: [
            {
              Component: () => <button>Click me</button>,
              onAction: () => {},
              name: "primary",
            },
          ],
          layout: {
            enableVirtualization: false,
            expandableRowHeight: 500,
            rowHeight: "dynamic",
            maxHeight: 600,
          },
          state: {
            columnPinning: {
              left: ["expander", "name", "id"],
              right: ["email", "date"],
            },
          },
          pluggableComponents: {
            ExpandableRow: MockExpandableRow,
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
