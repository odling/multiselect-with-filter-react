import {
  BREAKPOINTS,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  COLORS,
  SPACING,
  BORDER_RADIUS,
  BORDER_WIDTHS,
} from "./constants";
import { Themes } from "./styled";

const THEME_CONSTANTS = {
  breakpoint: BREAKPOINTS,
  fontSize: FONT_SIZES,
  fontWeight: FONT_WEIGHTS,
  lineHeight: LINE_HEIGHTS,
  spacing: SPACING,
  borderWidth: BORDER_WIDTHS,
  borderRadius: BORDER_RADIUS,
  commonColors: {
    white: COLORS.white,
    black: COLORS.black,
  },
};

const themes: Themes = {
  light: {
    ...THEME_CONSTANTS,
    color: {
      background: COLORS.white,
      foreground: COLORS.black,
      success: COLORS.green500,
      warning: COLORS.yellow500,
      danger: COLORS.red500,
      primary50: COLORS.sky50,
      primary100: COLORS.sky100,
      primary200: COLORS.sky200,
      primary300: COLORS.sky300,
      primary400: COLORS.sky400,
      primary500: COLORS.sky500,
      primary600: COLORS.sky600,
      primary700: COLORS.sky700,
      primary800: COLORS.sky800,
      primary900: COLORS.sky900,
    },
  },
  dark: {
    ...THEME_CONSTANTS,
    color: {
      background: COLORS.black,
      foreground: COLORS.white,
      success: COLORS.green500,
      warning: COLORS.yellow500,
      danger: COLORS.red500,
      primary50: COLORS.sky900,
      primary100: COLORS.sky800,
      primary200: COLORS.sky700,
      primary300: COLORS.sky600,
      primary400: COLORS.sky500,
      primary500: COLORS.sky400,
      primary600: COLORS.sky300,
      primary700: COLORS.sky200,
      primary800: COLORS.sky100,
      primary900: COLORS.sky50,
    },
  },
};

export default themes;
