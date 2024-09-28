import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import "flatpickr/dist/themes/material_blue.css";
import "tippy.js/dist/tippy.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";
import "./index.css";
import { store } from "./reduxStore/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
