import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Kiosk from "./routes/Kiosk";
import ErrorPage from "./routes/Error";
import Root from "./routes/Root";
import Income from "./routes/Income";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "order",
        element: <Kiosk />,
      },
      {
        path: "income",
        element: <Income />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
