import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./views/Layout.jsx";
import Main from "./views/Main/Main.jsx";
import ErrorPage from "./views/ErrorPage/ErrorPage.jsx";
import List from "./views/List/List.jsx";

import Header from "./components/Header/Header.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import PrivateRoute from "./views/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: (
      <>
        <Header />
        <ErrorPage />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/register",
        element: <Main />,
      },
      {
        path: "/login",
        element: <Main />,
      },
      {
        path: "/list",
        element: <PrivateRoute component={List} />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
