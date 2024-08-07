import type { Meta, StoryObj } from "@storybook/react";

import { PixaTable } from "../components";
import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { usePixaTable } from "../hooks";
import { MockData, MockDataColumnDefs } from "../mocks/handlers/mockData";

type Story = StoryObj<typeof PixaTable>;
type UsePixaTableOptions = Parameters<typeof usePixaTable<MockData>>[0];

const meta: Meta<typeof PixaTable> = {
  title: "PixaTable",
  component: PixaTable,
  loaders: [
    async () => {
      const response = await fetch(
        "/api/mock-data?skip=" + 0 + "&limit=" + 100 + "&fetchSize=" + 10,
      );
      const data = await response.json();
      return { data };
    },
  ],
  decorators: [
    (Story, context) => {
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          data: context.loaded.data,
          columns: MockDataColumnDefs,
        }),
        [context.loaded.data],
      );
      const table = usePixaTable<MockData>(config);
      return (
        <div style={{ height: "80vh", width: "100vw" }}>
          <Story
            args={{
              table: table as Table<unknown>,
            }}
          />
        </div>
      );
    },
  ],
};

export default meta;

export const Defaults: Story = {
  args: {},
};
