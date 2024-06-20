import AppLoader from "@hoc/app-loader";
import { CssBaseline } from "@mui/material";
import { Box, styled } from "@mui/material";
import MainLayout from "@layouts/main/main.layout";
import HeaderMain from "@components/UI/header-main/header-main";

const Container = styled(Box)`
  width: 100vw;
  height: 100vh;
  background: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <AppLoader>
      <CssBaseline />
      <Container>
        <HeaderMain />
        <MainLayout />
      </Container>
    </AppLoader>
  );
}

export default App;
