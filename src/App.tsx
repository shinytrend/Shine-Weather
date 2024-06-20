import { CssBaseline } from "@mui/material";
import AppLoader from "@hoc/app-loader";
import MainLayout from "@layouts/main/main.layout";

function App() {
  return (
    <>
      <CssBaseline />
      <AppLoader>
        <MainLayout />
      </AppLoader>
    </>
  );
}

export default App;
