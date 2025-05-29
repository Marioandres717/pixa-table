import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import { initialize } from "msw-storybook-addon";

import "../src/styles/index.css"; // Import Tailwind CSS
import { handlers } from "../src/mocks/handlers";

initialize(
  {
    onUnhandledRequest: "bypass",
  },
  handlers,
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),
  ],

  tags: ["autodocs"],
};

export default preview;
