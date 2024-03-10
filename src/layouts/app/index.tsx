import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

const AppLayout = () => {
  return (
    <div>
      <AppHeader />
      <main>
        <div className="mx-auto max-w-8xl py-10 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
