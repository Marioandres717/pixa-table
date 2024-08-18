import { Meta, StoryObj } from "@storybook/react";
import { PageSize } from "../components";
import { usePixaTable } from "../hooks";

type Story = StoryObj<typeof PageSize>;

const meta: Meta<typeof PageSize> = {
  title: "components/Page Size",
  component: PageSize,
  decorators: [
    (Story) => {
      const table = usePixaTable<unknown>({
        data: [],
        columns: [],
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
