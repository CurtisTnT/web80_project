import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import "flatpickr/dist/themes/material_blue.css";
import 'tippy.js/dist/tippy.css';

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
