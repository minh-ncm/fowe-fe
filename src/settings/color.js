const color = {
  main: {
    primary: "#191a48",
    secondary: "#FAD364",
  },
  background: {
    primary: "#fafafb",
    secondary: "#f0f1f9",
    alt1: "#ecebf6",
    alt2: "#dad9ec",
  },
  boxShadow: {
    primary: "#ecebf6",
  },
  text: {
    primary: "#191a48",
    secondary: "#9695AB",
  },
  error: {
    primary: "#F0502F",
  },
  warning: {
    primary: "#CABD10",
  },
  success: { primary: "#009100" },
};

const defaultTheme = {
  palette: {
    mode: "light",
    primary: { main: color.main.primary },
    secondary: { main: color.main.secondary },
    error: { main: color.error.primary },
    warning: { main: color.error.primary },
    success: { main: color.success.primary },
    background: {
      default: color.background.primary,
      paper: color.background.primary,
    },
    text: { primary: color.text.primary, secondary: color.text.secondary },
  },
};
export { color, defaultTheme };
