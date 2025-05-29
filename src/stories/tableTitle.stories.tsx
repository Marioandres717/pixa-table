import { Meta, StoryObj } from "@storybook/react-vite";
import { TableTitle } from "../components";
import { usePixaTable } from "../hooks";
import { MockData } from "../mocks/handlers/mockData";

type Story = StoryObj<typeof TableTitle>;

const meta: Meta<typeof TableTitle<MockData>> = {
  title: "components/Table Title",
  component: TableTitle,
  decorators: [
    (Story, context) => {
      const table = usePixaTable<MockData>({
        columns: [],
        data: [],
        theme: context.globals.theme,
        enableTableActions: true,
        tableActions: [
          {
            name: "action 1",
            onAction: (table) => {
              alert(table.getTableActions()[0].name);
            },
          },
        ],
        layout: {
          showTitle: "My Table",
        },
      });
      return (
        <div className="pxt">
          <Story
            args={{
              table,
            }}
          />
        </div>
      );
    },
  ],
};

export default meta;

export const Defaults: Story = {};
