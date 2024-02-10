import AppLayout from "../layouts/app";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
]);

export default router;
