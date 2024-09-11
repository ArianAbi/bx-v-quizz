import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Game from "./Game.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import ErrorUI from "./components/ErrorUI.tsx";
import Admin from "./Admin.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary fallback={<ErrorUI />}>
        <App />
      </ErrorBoundary>
    ),
  },
  {
    path: "/game",
    element: (
      <ErrorBoundary fallback={<ErrorUI />}>
        <Game />
      </ErrorBoundary>
    ),
  },
  {
    path: "/admin",
    element: (
      <ErrorBoundary fallback={<ErrorUI />}>
        <Admin />
      </ErrorBoundary>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorUI />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
