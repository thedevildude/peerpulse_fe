import SignIn from "@/pages/sign-in";
import AppLayout from "../layouts/app";
import { createBrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import SignUp from "@/pages/sign-up";
import Home from "@/pages/home";
import VerifyEmail from "@/pages/verify-email";
import Logout from "@/pages/logout";

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const router = sentryCreateBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
    ],
  },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/logout", element: <Logout /> },
]);

export default router;
