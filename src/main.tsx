import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createStore } from "./store/create.store.ts";
import { YMaps } from "@pbe/react-yandex-maps";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <YMaps version={"2.1"}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </YMaps>
  </Provider>
);
