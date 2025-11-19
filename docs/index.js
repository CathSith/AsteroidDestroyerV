
import './index';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Destroy } from "./Pages/Destoy";
import { Asteroid } from "./Pages/Asteroid";
import { Asteroids } from "./Pages/Asteroids";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AsteroidContextProvider } from "./Components/AsteroidCard/AsteroidCardContent/AsteroidContext";

const router = createHashRouter([
  {
    path: "/asteroids",
    element: <Asteroids />,
  },
  {
    path: "/destruction",
    element: <Destroy />,
  },
  {
    path: "/asteroid/:id",
    element: <Asteroid />
  },
  {
    path: "*",
    element: <Asteroids />
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <AsteroidContextProvider>
      <RouterProvider router={router} />
    </AsteroidContextProvider>
  </React.StrictMode>
);