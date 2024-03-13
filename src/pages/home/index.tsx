import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      Home
      <p>{t("today-date", { date: new Date() })}</p>
    </div>
  );
};

export default Home;
