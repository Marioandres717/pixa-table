import type { Meta, StoryObj } from "@storybook/react";

import { PixaTable } from "../../components";
import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { usePixaTable } from "../../hooks";
import { MockData, MockDataColumnDefs } from "../../mocks/handlers/mockData";
import { InsideResizableContainer as resizeContainerStory } from "./insideResizableContainer";
import { TableWithSelectableRows } from "./withSelectableRows";
import { TableWithExpandableRows } from "./withExpandableRows";
import { TableWithManyCols } from "./withManyCols";
import { TableWithRowActions } from "./withRowActions";
import { TableWithGlobalFilter } from "./withGlobalFilter";
import { TableIsLoadingSkeleton } from "./isLoadingSkeleton";
import { TableWithCustomPageSize } from "./withCustomPageSize";
import { TableWithCustomPagination } from "./withCustomPagination";
import { TableWithCustomHeaderFilter } from "./withCustomHeaderFilter";
import { TableWithCustomLayout } from "./withCustomLayout";
import { TableWithCustomCell } from "./withCustomCell";
import { TableWithVirtualizationDisabled } from "./withVirtualizationDisabled";
import { TableWithDynamicRowHeight } from "./withDynamicRowHeight";

export type Story = StoryObj<typeof PixaTable>;
export type UsePixaTableOptions = Parameters<typeof usePixaTable<MockData>>[0];

const meta: Meta<typeof PixaTable> = {
  title: "components/Table",
  component: PixaTable,
  argTypes: {
    table: {
      table: {
        disable: true,
      },
    },
  },
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
          theme: context.globals.theme,
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

export default meta;

export const Defaults: Story = {
  args: {},
};

export const InsideResizableContainer = resizeContainerStory;
export const IsLoading = TableIsLoadingSkeleton;
export const WithCustomCell = TableWithCustomCell;
export const WithCustomHeaderFilter = TableWithCustomHeaderFilter;
export const WithCustomLayout = TableWithCustomLayout;
export const WithCustomPageSize = TableWithCustomPageSize;
export const WithCustomPagination = TableWithCustomPagination;
export const WithExpandableRows = TableWithExpandableRows;
export const WithGlobalFilter = TableWithGlobalFilter;
export const WithManyCols = TableWithManyCols;
export const WithRowActions = TableWithRowActions;
export const WithSelectableRows = TableWithSelectableRows;
export const WithVirtualizationDisabled = TableWithVirtualizationDisabled;
export const WithDynamicRowHeight = TableWithDynamicRowHeight;
