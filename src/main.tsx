import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import topLevelNavigation from "./navigation/top-level-nav";
import { Provider } from "react-redux";
import store from "./app/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: topLevelNavigation,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
