import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ff427f",
      light: "#FF577F",
      dark: "#59323f",
    },
    secondary: {
      main: "#343b41",
      light: "#868e96",
      dark: "#121214",
      contrastText: "#f8f9fa",
    },
    white: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#FFFFFF",
    },
    background: {
      default: "#121214",
      paper: "#212529",
    },
    error: {
      main: "#e83f5b",
    },
    success: {
      main: "#3fe864",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

export default theme;
