import SignIn from "@/pages/sign-in";
import AppLayout from "../layouts/app";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "@/pages/sign-up";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <div>Home</div> }],
  },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
]);

export default router;
