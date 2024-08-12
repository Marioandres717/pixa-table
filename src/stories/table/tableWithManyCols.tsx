import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { usePixaTable } from "../../hooks";
import {
  mockDataManyColumnsDefs,
  MockDataManyCols,
} from "../../mocks/handlers/mockMany";
import { Story } from "./pixaTable.stories";

type UsePixaTableOptionsManyCols = Parameters<
  typeof usePixaTable<MockDataManyCols>
>[0];

export const TableWithManyCols: Story = {
  loaders: [
    async () => {
      const response = await fetch(
        "/api/many-cols?skip=" +
          0 +
          "&limit=" +
          100 +
          "&cols=" +
          22 +
          "&rows=" +
          100,
      );
      const data = await response.json();
      return { data };
    },
  ],
  decorators: [
    (Story, context) => {
      const config = useMemo<UsePixaTableOptionsManyCols>(
        () => ({
          data: context.loaded.data,
          columns: mockDataManyColumnsDefs,
        }),
        [context.loaded.data],
      );
      const table = usePixaTable<MockDataManyCols>(config);
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
