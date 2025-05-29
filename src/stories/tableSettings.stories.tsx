import { Meta, StoryObj } from "@storybook/react-vite";
import { TableSettings } from "../components/tableSettings";
import { usePixaTable } from "../hooks";
import { MockDataColumnDefs } from "../mocks/handlers/mockData";

type Story = StoryObj<typeof TableSettings>;

const meta: Meta<typeof TableSettings> = {
  title: "components/Table Settings",
  component: TableSettings,
};

export default meta;

export const Defaults: Story = {
  decorators: [
    (Story, context) => {
      const table = usePixaTable({
        data: [],
        columns: MockDataColumnDefs,
      });
      return (
        <div className="pxt">
          <Story
            args={{
              ...context.args,
              table: table,
            }}
          />
        </div>
      );
    },
  ],
};
