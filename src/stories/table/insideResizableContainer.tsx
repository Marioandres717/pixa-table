import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { ResizableDiv } from "../../components";
import { usePixaTable } from "../../hooks";
import { MockDataColumnDefs, MockData } from "../../mocks/handlers/mockData";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";

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
