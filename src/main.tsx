import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { YMaps } from "@pbe/react-yandex-maps";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "./store/create.store.ts";
import App from "./App.tsx";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <YMaps>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </YMaps>
  </Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
