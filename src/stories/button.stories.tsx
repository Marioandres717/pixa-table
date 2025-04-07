import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Button } from "../components";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "components/Button",
  component: Button,
  args: {
    children: "click me",
    onClick: fn(),
  },
};

export default meta;

export const Defaults: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /click me/i });
    await expect(button).toBeVisible();
    await expect(button).toHaveTextContent(/click me/i);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
  decorators: [
    (Story, context) => {
      return (
        <div className="pxt">
          <Story
            args={{
              ...context.args,
            }}
          />
        </div>
      );
    },
  ],
};
