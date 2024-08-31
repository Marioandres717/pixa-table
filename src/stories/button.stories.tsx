import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "components/Button",
  component: Button,
  args: {
    children: "Button",
  },
};

export default meta;

export const Defaults: Story = {};
