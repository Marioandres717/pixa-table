import { Table } from "@tanstack/react-table";
import { usePixaTable } from "../../hooks";
import { Story } from "./pixaTable.stories";

export const TableIsLoading: Story = {
  decorators: [
    (Story, context) => {
      const table = usePixaTable<unknown>({
        theme: context.globals.theme,
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
