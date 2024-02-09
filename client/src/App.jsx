import { Layout } from "./views/Layout.jsx";
import Main from "./views/Main/Main.jsx";
import ErrorPage from "./views/ErrorPage/ErrorPage.jsx";
import List from "./views/List/List.jsx";
import Details from "./views/Details/Details.jsx";
import Header from "./components/Header/Header.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "./redux/store.js";

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
      {
        path: "/details/:characterId",
        element: <PrivateRoute component={Details} />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
