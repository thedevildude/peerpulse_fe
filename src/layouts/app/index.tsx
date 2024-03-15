import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import { AuthProvider } from "@/providers/authProvider";

const AppLayout = () => {
  return (
    <AuthProvider>
      <div>
        <AppHeader />
        <main>
          <div className="max-w-8xl mx-auto py-10 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </AuthProvider>
  );
};

export default AppLayout;
