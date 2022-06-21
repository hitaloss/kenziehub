import "./styles/global.js";
import Routes from "./routes/index.jsx";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/palette";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        limit={1}
        pauseOnHover
        transition={Slide}
      />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default App;
