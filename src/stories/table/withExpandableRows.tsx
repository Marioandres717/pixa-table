import { createColumnHelper, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { ExpandableColumn } from "../../components";
import { usePixaTable } from "../../hooks";
import { MockDataColumnDefs, MockData } from "../../mocks/handlers/mockData";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { MockExpandableRow } from "../../mocks/handlers/mockExpandableRow";

const columnHelper = createColumnHelper<MockData>();

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
            expanded: {
              "0": true,
              "1": true,
            },
          },
          pluggableComponents: {
            ExpandableRow: MockExpandableRow,
          },
          layout: {
            rowHeight: "dynamic",
            expandableRowHeight: 500,
          },
        }),
        [context.loaded.data, context.globals.theme],
      );
      const table = usePixaTable<MockData>(config);
      return (
        <div className="h-[500px]">
          <Story
            args={{
              ...context.args,
              table: table as Table<unknown>,
            }}
          />
        </div>
      );
    },
  ],
};
