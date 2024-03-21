import { useAuthProvider } from "@/providers/authProvider";
import { useTranslation } from "react-i18next";
import UnverifiedEmailAlert from "./UnverifiedEmailAlert";

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuthProvider();
  return (
    <div>
      {t("homepage")}
      <p>{t("today-date", { date: new Date() })}</p>
      <p>{t("right-now", { time: new Date() })}</p>
      {user && !user.isEmailVerified && <UnverifiedEmailAlert />}
      <div className="grid h-screen grid-cols-2 md:grid-cols-4">
        <div className="col-span-1 hidden bg-gray-200 md:block">
          Left Sidebar
        </div>
        <div className="col-span-2 bg-gray-300">Main content</div>
        <div className="col-span-1 hidden bg-gray-200 md:block">
          Right Sidebar
        </div>
      </div>
    </div>
  );
};

export default Home;
