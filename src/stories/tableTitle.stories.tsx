import { Meta, StoryObj } from "@storybook/react";
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
        layout: {
          showTitle: "My Table",
        },
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
