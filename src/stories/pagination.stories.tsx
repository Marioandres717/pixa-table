import { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "../components";
import { usePixaTable } from "../hooks";

type Story = StoryObj<typeof Pagination>;

const meta: Meta<typeof Pagination> = {
  title: "components/Pagination",
  component: Pagination,
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
      const table = usePixaTable<unknown>({
        columns: [],
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
