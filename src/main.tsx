import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import HomePage from "@/pages/HomePage.js";
import DataPage from "@/pages/DataPage.js";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/data",
        element: <DataPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
