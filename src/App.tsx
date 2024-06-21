import "dayjs/locale/ru";
import dayjs from "dayjs";
import AppLoader from "@hoc/app-loader";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MainLayout from "@layouts/main/main.layout";
import HeaderMain from "@components/UI/header-main/header-main";
import { ApplicationStyled } from "@styles/application-styled";

function App() {
  dayjs.locale("ru");

  return (
    <AppLoader>
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
    </AppLoader>
  );
}

export default App;
