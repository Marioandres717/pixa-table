import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../components";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
} satisfies Meta; // checks if we are passing the correct options, helful for migrations

export default meta;

export const Primary: Story = {
  args: {
    children: "Primary",
  },
};
