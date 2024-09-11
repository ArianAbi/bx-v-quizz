import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Game from "./Game.tsx";
import Admin from "./Admin.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/panel",
    element: <Admin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
