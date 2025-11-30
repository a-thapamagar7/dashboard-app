import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import HomePage from "@/pages/HomePage.js";
import DataPage from "@/pages/DataPage.js";
import { Provider } from "react-redux";
import { store } from "@/redux/store.ts";

const router = createBrowserRouter([
  {
    element: <App />,
    handle: {
      breadcrumb: "Items",
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
        handle: {
          breadcrumb: "Home",
        },
      },
      {
        path: "/data",
        element: <DataPage />,
        handle: {
          breadcrumb: "Data",
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
