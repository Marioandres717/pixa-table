import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Button } from "../components";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "components/Button",
  component: Button,
  args: {
    children: "Button",
    onClick: fn(),
  },
};

export default meta;

export const Defaults: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalled();
  },
};
