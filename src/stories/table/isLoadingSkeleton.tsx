import { Table } from "@tanstack/react-table";
import { usePixaTable } from "../../hooks";
import { Story } from "./pixaTable.stories";

export const TableIsLoadingSkeleton: Story = {
  decorators: [
    (Story, context) => {
      const table = usePixaTable<unknown>({
        columns: [],
        data: [],
        theme: context.globals.theme,
        showSkeleton: true,
        state: {
          isLoading: true,
        },
      });

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
