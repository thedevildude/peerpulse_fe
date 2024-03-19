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
    </div>
  );
};

export default Home;
