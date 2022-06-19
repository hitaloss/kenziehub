import "./styles/global.js";
import Routes from "./routes/index.jsx";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/palette";

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default App;
