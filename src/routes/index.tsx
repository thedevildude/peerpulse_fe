import SignIn from "@/pages/sign-in";
import AppLayout from "../layouts/app";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "@/pages/sign-up";
import Home from "@/pages/home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
]);

export default router;
