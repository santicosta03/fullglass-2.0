import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout.tsx";
import Login from "./components/Login.tsx";
import LandingPage from "./components/LandingPage.tsx";
import Register from "./components/Register.tsx";
import ForgotPassword from "./components/ForgotPassword.tsx";
import Panel from "./components/Panel.tsx";
import Products from "./components/Products.tsx";
import Profile from "./components/Profile.tsx";
import Clients from "./components/Clients.tsx";
import NotFound from "./components/NotFound.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/panel",
        element: <Panel />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);