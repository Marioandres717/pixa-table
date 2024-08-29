import { useMemo, useState } from "react";
import { getFilteredRowModel, Table } from "@tanstack/react-table";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { MockData, MockDataColumnDefs } from "../../mocks/handlers/mockData";
import { usePixaTable } from "../../hooks";
import { fuzzyFilter } from "../../features";

export const TableWithGlobalFilter: Story = {
  decorators: [
    (Story, context) => {
      const [globalFilter, setGlobalFilter] = useState<string>("");
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          theme: context.globals.theme,
          data: context.loaded.data,
          columns: MockDataColumnDefs,
          onGlobalFilterChange: setGlobalFilter,
          getFilteredRowModel: getFilteredRowModel(),
          globalFilterFn: "fuzzy",
          state: {
            globalFilter,
          },
          filterFns: {
            fuzzy: fuzzyFilter,
          },
        }),
        [context.loaded.data, globalFilter, context.globals.theme],
      );
      const table = usePixaTable<MockData>(config);

      return (
        <>
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <Story
            args={{
              ...context.args,
              table: table as Table<unknown>,
            }}
          />
        </>
      );
    },
  ],
};
