import { Table } from "@tanstack/react-table";
import { usePixaTable } from "../../hooks";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { MockData, MockDataColumnDefs } from "../../mocks/handlers/mockData";
import { useMemo } from "react";
import React from "react";

export const TableWithCustomScrollableContainer: Story = {
  decorators: [
    (Story, context) => {
      const ref = React.useRef<HTMLDivElement>(null);
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          data: context.loaded.data,
          columns: MockDataColumnDefs,
          theme: context.globals.theme,
          layout: {
            scrollableContainerRef: ref,
            scrollMargin: 232,
          },
          initialState: {
            pagination: {
              pageSize: 100,
            },
          },
        }),
        [context.loaded.data, context.globals.theme, ref],
      );
      const table = usePixaTable<MockData>(config);

      return (
        <div ref={ref} className="max-h-96 w-full overflow-auto bg-black-40">
          <div className="size-40 text-7xl font-bold uppercase">
            scrollable container
          </div>
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
