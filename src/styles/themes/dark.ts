import { primitiveColors } from "./base";

export const darkTheme = {
  surface: {
    base: primitiveColors.black[100],
    elevated: primitiveColors.black[95],
    overlay: primitiveColors.black[92.5],
    inverted: primitiveColors.white,
  },
  text: {
    primary: primitiveColors.black[10],
    secondary: primitiveColors.black[40],
    inverted: primitiveColors.black[100],
  },
  border: {
    primary: primitiveColors.black[92.5],
    subtle: primitiveColors.black[20],
    strong: primitiveColors.black[70],
  },
  interaction: {
    hover: primitiveColors.black[90],
    active: "#173344",
    accent: primitiveColors.blue[100],
  },
} as const;
