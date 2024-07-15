export const theme = {
  style: {
    borderRadius: "10px",
  },
  sizes: {
    xs: "300px",
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "3xl": "1920px",
  },
  colors: {
    white: "#fff",
    black: "#000",
    danger: "#9f1239",
    success: "#065f46",
    secondary: {
      main: "#002b6b",
      dark: "#002256",
      contrastText: "#fff",
    },
    primary: {
      700: "#3C4D6D",
      50: "#E7E9ED",
      100: "#CED3DB",
      200: "#B6BCC8",
      300: "#9DA6B6",
      400: "#8590A4",
      500: "#6D7A92",
      600: "#546480",
      800: "#23375B",
      900: "#0B2149",
    },
  },
  fonts: {
    size: {
      small: "14px",
      medium: "16px",
      large: "20px",
      heading1: "32px",
      heading2: "24px",
      heading3: "20px",
    },
    weight: {
      bold: 900,
      semibold: 500,
      thin: 300,
      ultraThin: 100,
    },
  },
};

export type CustomThemeTypes = typeof theme;
