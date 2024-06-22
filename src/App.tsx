import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
// components
import AppLoader from "@hoc/app-loader";
import MainLayout from "@layouts/main/main.layout";
import HeaderMain from "@components/UI/header-main/header-main";
// styles
import "react-toastify/dist/ReactToastify.css";
import { ApplicationStyled } from "@styles/application-styled";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";

const MainContainer = styled(Box)`
  height: 100%;
`;

const theme = createTheme({});

function App() {
  dayjs.locale("ru");
  const [screenSize, setScreenSize] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    setScreenSize(isSmallScreen);
  }, [isSmallScreen]);

  return (
    <AppLoader>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApplicationStyled>
          <HeaderMain />
          <MainContainer sx={{ width: screenSize ? "100%" : "1024px" }}>
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
