import { primitiveColors } from "./base";

export const lightTheme = {
  surface: {
    base: primitiveColors.white,
    elevated: primitiveColors.black[5],
    overlay: primitiveColors.black[10],
    canvas: primitiveColors.black[100],
  },
  text: {
    primary: primitiveColors.black[100],
    secondary: primitiveColors.black[50],
    inverted: primitiveColors.white,
  },
  border: {
    primary: primitiveColors.black[20],
    subtle: primitiveColors.black[40],
    strong: primitiveColors.black[100],
  },
  interaction: {
    hover: primitiveColors.black[10],
    active: primitiveColors.blue[30],
    accent: primitiveColors.blue[120],
  },
};
