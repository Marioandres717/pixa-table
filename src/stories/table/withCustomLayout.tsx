import { Table } from "@tanstack/react-table";
import { usePixaTable } from "../../hooks";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { MockData, MockDataColumnDefs } from "../../mocks/handlers/mockData";
import { useMemo } from "react";

export const TableWithCustomLayout: Story = {
  // These args are used to test the layout of the table, they are not part of the table props
  args: {
    showHeader: true,
    showFooter: false,
    showSidebar: true,
    maxHeight: 400,
    showPagination: false,
    showTotalResults: false,
  },
  argTypes: {
    showHeader: {
      control: {
        type: "boolean",
      },
    },
    showFooter: {
      control: {
        type: "boolean",
      },
    },
    showSidebar: {
      control: {
        type: "boolean",
      },
    },
    maxHeight: {
      control: {
        type: "number",
      },
    },
    showPagination: {
      control: {
        type: "check",
        options: ["top", "bottom", "both", "none"],
      },
    },
    showTotalResults: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { args } = context;
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          data: context.loaded.data,
          columns: MockDataColumnDefs,
          theme: context.globals.theme,
          layout: {
            showHeader: args.showHeader,
            showFooter: args.showFooter,
            showSidebar: args.showSidebar,
            maxHeight: args.maxHeight,
            showPagination: args.showPagination,
            showTotalResults: args.showTotalResults,
          },
        }),
        [context.loaded.data, context.globals.theme, args],
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
