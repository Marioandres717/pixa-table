import type { Meta, StoryObj } from "@storybook/react";

import { PixaTable } from "../../components";
import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { usePixaTable } from "../../hooks";
import { MockData, MockDataColumnDefs } from "../../mocks/handlers/mockData";
import { InsideResizableContainer as resizeContainerStory } from "./insideResizableContainer";
import { TableWithSelectableRows } from "./tableWithSelectableRows";
import { TableWithExpandableRows } from "./tableWithExpandableRows";
import { TableWithManyCols } from "./tableWithManyCols";
import { TableWithRowActions } from "./tableWithRowActions";
import { TableWithGlobalFilter } from "./tableWithGlobalFilter";

export type Story = StoryObj<typeof PixaTable>;
export type UsePixaTableOptions = Parameters<typeof usePixaTable<MockData>>[0];

const meta: Meta<typeof PixaTable> = {
  title: "Table",
  component: PixaTable,
  loaders: [
    async () => {
      const response = await fetch(
        "/api/mock-data?skip=" + 0 + "&limit=" + 100 + "&fetchSize=" + 100,
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
        <Story
          args={{
            table: table as Table<unknown>,
          }}
        />
      );
    },
  ],
};

export default meta;

export const Defaults: Story = {
  args: {},
};

export const WithManyCols: Story = TableWithManyCols;

export const WithSelectableRows: Story = TableWithSelectableRows;

export const WithRowActions: Story = TableWithRowActions;

export const WithExpandableRows: Story = TableWithExpandableRows;

export const InsideResizableContainer: Story = resizeContainerStory;

export const WithGlobalFilter: Story = TableWithGlobalFilter;
