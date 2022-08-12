import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./global.css";
import store from "./app/store"; 

const root = document.getElementById("root");

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
