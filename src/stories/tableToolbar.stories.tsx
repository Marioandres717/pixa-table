import { Meta, StoryObj } from "@storybook/react";
import { TableToolbar } from "../components";
import { usePixaTable } from "../hooks";
import { MockData, MockDataColumnDefs } from "../mocks/handlers/mockData";

type Story = StoryObj<typeof TableToolbar>;

const meta: Meta<typeof TableToolbar<MockData>> = {
  title: "components/Table Toolbar",
  component: TableToolbar,
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
      const table = usePixaTable<MockData>({
        columns: MockDataColumnDefs,
        data: context.loaded.data,
        theme: context.globals.theme,
      });
      return (
        <Story
          args={{
            table,
          }}
        />
      );
    },
  ],
};

export default meta;

export const Defaults: Story = {};
