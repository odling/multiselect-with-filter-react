import "styled-components";
import {
  border,
  breakpoints,
  controlsStyles,
  fontSize,
  fontWeight,
  footerHeight,
  gutterValues,
  headerHeight,
  shadow,
  viewportHorizontalMargins,
  viewportWidths,
  zIndices,
} from "../theme/themeConstants";
import { themeVariables } from "../theme/themeVariables";
import {
  BORDER_RADIUS,
  BORDER_WIDTHS,
  BREAKPOINTS,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  SPACING,
} from "./constants";

export type Theme = {
  breakpoint: typeof BREAKPOINTS;
  fontSize: typeof FONT_SIZES;
  fontWeight: typeof FONT_WEIGHTS;
  lineHeight: typeof LINE_HEIGHTS;
  spacing: typeof SPACING;
  borderWidth: typeof BORDER_WIDTHS;
  borderRadius: typeof BORDER_RADIUS;
  commonColors: {
    white: string;
    black: string;
  };
  color: {
    background: string;
    foreground: string;
    success: string;
    warning: string;
    danger: string;
    primary50: string;
    primary100: string;
    primary200: string;
    primary300: string;
    primary400: string;
    primary500: string;
    primary600: string;
    primary700: string;
    primary800: string;
    primary900: string;
  };
};

export type Themes = {
  light: Theme;
  dark: Theme;
};

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
