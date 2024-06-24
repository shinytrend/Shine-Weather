import "dayjs/locale/ru";
import dayjs from "dayjs";
import configFile from "@config/config.json";
import { ToastContainer } from "react-toastify";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
// components
import AppLoader from "@hoc/app-loader";
import MainLayout from "@layouts/main/main.layout";
import HeaderMain from "@components/UI/header-main/header-main";
// styles
import "./styles/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ApplicationStyled } from "@styles/application-styled";

const MainContainer = styled(Box)`
  height: 100%;
`;

const theme = createTheme({});

const MOBILE_WIDTH = configFile.mobile_width;

function App() {
  dayjs.locale("ru");
  const isMobileScreen = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);

  return (
    <AppLoader>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApplicationStyled>
          <HeaderMain />
          <MainContainer sx={{ width: isMobileScreen ? "100%" : "1024px" }}>
            <MainLayout />
          </MainContainer>
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
