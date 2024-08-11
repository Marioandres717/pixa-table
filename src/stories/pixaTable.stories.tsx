import type { Meta, StoryObj } from "@storybook/react";

import {
  ExpandableColumn,
  IndeterminateCheckbox,
  PixaTable,
  ResizableDiv,
} from "../components";
import { createColumnHelper, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { usePixaTable } from "../hooks";
import { MockData, MockDataColumnDefs } from "../mocks/handlers/mockData";
import {
  MockDataManyCols,
  mockDataManyColumnsDefs,
} from "../mocks/handlers/mockMany";

type Story = StoryObj<typeof PixaTable>;
type UsePixaTableOptions = Parameters<typeof usePixaTable<MockData>>[0];

const meta: Meta<typeof PixaTable> = {
  title: "PixaTable",
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

export const InsideResizableContainer: Story = {
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
        <ResizableDiv
          renderProps={() => (
            <Story
              args={{
                table: table as Table<unknown>,
              }}
            />
          )}
        />
      );
    },
  ],
};

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

const columnHelper = createColumnHelper<MockData>();

export const TableWithSelectableRows: Story = {
  decorators: [
    (Story, context) => {
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          selectable: true,
          data: context.loaded.data,
          columns: [
            columnHelper.display({
              id: "selection",
              maxSize: 50,
              enableSorting: false,
              enableResizing: false,
              enableHiding: false,
              meta: {
                className: "border-r-0 px-0",
              },
              header({ table }) {
                return (
                  <IndeterminateCheckbox
                    {...{
                      checked: table.getIsAllRowsSelected(),
                      indeterminate: table.getIsSomeRowsSelected(),
                      onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                  />
                );
              },
              cell({ row }) {
                return (
                  <IndeterminateCheckbox
                    {...{
                      checked: row.getIsSelected(),
                      disabled: !row.getCanSelect(),
                      indeterminate: row.getIsSomeSelected(),
                      onChange: row.getToggleSelectedHandler(),
                    }}
                  />
                );
              },
            }),
            columnHelper.display({
              id: "action",
              size: 100,
              enableSorting: false,
              enableResizing: false,
              enableHiding: false,
              header: "actions",
              cell: ({ row }) => (
                <div className="flex justify-center">
                  <button
                    className="rounded bg-transparent py-1 text-white"
                    onClick={() => alert(row.id)}
                  >
                    Click
                  </button>
                </div>
              ),
            }),
            ...MockDataColumnDefs,
          ],
          state: {
            columnPinning: {
              left: ["selection"],
              right: ["action"],
            },
          },
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

export const TableWithExpandableRows: Story = {
  decorators: [
    (Story, context) => {
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          expandable: true,
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
        [context.loaded.data],
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
