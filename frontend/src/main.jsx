import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import AllRoutes from "./Routes/AllRoutes.jsx";
import { ToastContainer } from "react-toastify";
import './index.css'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AllRoutes />
    <ToastContainer />
  </BrowserRouter>
);
