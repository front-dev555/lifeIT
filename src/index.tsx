import { createRoot } from "react-dom/client";
import App from "./App";
import { StoreProvider } from "./quax/useQuaxStore";
import { configureStore } from "./store";

const store = configureStore();

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
