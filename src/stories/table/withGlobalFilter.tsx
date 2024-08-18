import { useMemo, useState } from "react";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { MockData, MockDataColumnDefs } from "../../mocks/handlers/mockData";
import { usePixaTable } from "../../hooks";
import { getFilteredRowModel, Table } from "@tanstack/react-table";
import { fuzzyFilter } from "../../features/fuzzyFilter/feature";

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
          debugAll: true,
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
              table: table as Table<unknown>,
            }}
          />
        </>
      );
    },
  ],
};
