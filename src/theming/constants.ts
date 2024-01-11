const FONT_SIZES = {
  text_xxs: "0.625rem",
  text_xs: "0.75rem",
  text_sm: "0.875rem",
  text_md: "1rem",
  text_lg: "1.125rem",
  text_xl: "1.25rem",

  header_xxs: "1.25rem",
  header_xs: "1.5rem",
  header_sm: "1.875rem",
  header_md: "2.25rem",
  header_lg: "3rem",
} as const;

const FONT_WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

const LINE_HEIGHTS = {
  text_xxs: "0.75rem",
  text_xs: "1rem",
  text_sm: "1.25rem",
  text_md: "1.5rem",
  text_lg: "1.75rem",
  text_xl: "1.875rem",

  header_xxs: "1.875rem",
  header_xs: "2rem",
  header_sm: "2.375rem",
  header_md: "2.75rem",
  header_lg: "3.75rem",
} as const;

const BREAKPOINTS = {
  zero: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

const COLORS = {
  white: "#FFFFFF",
  black: "#11181C",

  /* GRAY */
  gray50: "#fafafa",
  gray100: "#f4f4f5",
  gray200: "#e4e4e7",
  gray300: "#d4d4d8",
  gray400: "#a1a1aa",
  gray500: "#a1a1aa",
  gray600: "#52525b",
  gray700: "#3f3f46",
  gray800: "#27272a",
  gray900: "#18181b",

  /* BLUE */
  blue50: "#e6f1fe",
  blue100: "#cce3fd",
  blue200: "#99c7fb",
  blue300: "#66aaf9",
  blue400: "#338ef7",
  blue500: "#006FEE",
  blue600: "#005bc4",
  blue700: "#004493",
  blue800: "#002e62",
  blue900: "#001731",

  /* SKY */
  sky50: "#FCFCFD",
  sky100: "#F1F7FB",
  sky200: "#E4EFF7",
  sky300: "#CEDCE9",
  sky400: "#B5C3D4",
  sky500: "#94A3B8",
  sky600: "#5D646F",
  sky700: "#51565C",
  sky800: "#46494D",
  sky900: "#3C3E41",

  /* GREEN */
  green50: "#e8faf0",
  green100: "#d1f4e0",
  green200: "#a2e9c1",
  green300: "#74dfa2",
  green400: "#45d483",
  green500: "#17c964",
  green600: "#12a150",
  green700: "#0e793c",
  green800: "#095028",
  green900: "#052814",

  /* YELLOW */
  yellow50: "#fefce8",
  yellow100: "#fdedd3",
  yellow200: "#fbdba7",
  yellow300: "#f9c97c",
  yellow400: "#f7b750",
  yellow500: "#f5a524",
  yellow600: "#c4841d",
  yellow700: "#936316",
  yellow800: "#62420e",
  yellow900: "#312107",

  /* RED */
  red50: "#fee7ef",
  red100: "#fdd0df",
  red200: "#faa0bf",
  red300: "#f871a0",
  red400: "#f54180",
  red500: "#f31260",
  red600: "#c20e4d",
  red700: "#920b3a",
  red800: "#610726",
  red900: "#310413",
} as const;

const SPACING = {
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const;

const BORDER_WIDTHS = {
  thickest: "8px",
  thick: "4px",
  medium: "2px",
  thin: "1px",
  none: "0",
} as const;

const BORDER_RADIUS = {
  fullCircle: "50%",
  veryLarge: "40px",
  large: "26px",
  medium: "20px",
  slightSmall: "16px",
  small: "14px",
  smaller: "12px",
  standard: "10px",
  tiny: "5px",
  none: "0",
} as const;

export {
  BREAKPOINTS,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  COLORS,
  SPACING,
  BORDER_WIDTHS,
  BORDER_RADIUS,
};
