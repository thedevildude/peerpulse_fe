import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t("homepage")}
      <p>{t("today-date", { date: new Date() })}</p>
    </div>
  );
};

export default Home;
