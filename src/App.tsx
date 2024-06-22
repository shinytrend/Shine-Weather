import "dayjs/locale/ru";
import dayjs from "dayjs";
import AppLoader from "@hoc/app-loader";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MainLayout from "@layouts/main/main.layout";
import HeaderMain from "@components/UI/header-main/header-main";
import { ApplicationStyled } from "@styles/application-styled";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#dc004e"
    }
  }
});

function App() {
  dayjs.locale("ru");

  return (
    <AppLoader>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApplicationStyled>
          <HeaderMain />
          <MainLayout />
        </ApplicationStyled>
        <ToastContainer
          position="bottom-left"
          className="toast-container"
          autoClose={2200}
        />
      </ThemeProvider>
    </AppLoader>
  );
}

export default App;
