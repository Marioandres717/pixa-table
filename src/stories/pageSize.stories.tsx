import { Meta, StoryObj } from "@storybook/react";
import { PageSize } from "../components";
import { usePixaTable } from "../hooks";

type Story = StoryObj<typeof PageSize>;

const meta: Meta<typeof PageSize> = {
  title: "components/Page Size",
  component: PageSize,
  argTypes: {
    table: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const table = usePixaTable<unknown>({
        data: [],
        columns: [],
      });

      return (
        <Story
          args={{
            ...context.args,
            table,
          }}
        />
      );
    },
  ],
};

export default meta;

export const Defaults: Story = {};
