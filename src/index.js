import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Kiosk from "./routes/Kiosk";
import ErrorPage from "./routes/Error";
import Root from "./routes/Root";
import Income from "./routes/Income";
import ProductManagement from "./routes/ProductManagement";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Game from "./routes/Game";
import ProductsList from "./routes/ProductsList";
import Product from "./routes/Product";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//데이터 상태, 캐싱, 업데이트 등 관리하는 객체 .
//여러 쿼리와 뮤테이션을 관리함.
const queryClient = new QueryClient();
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
      {
        path: "menu",
        element: <ProductManagement />,
      },
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "products",
        element: <ProductsList />,
      },
      {
        path: "products/:productId",
        element: <Product />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
