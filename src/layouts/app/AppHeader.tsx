import { LanguageModeToggle } from "@/components/header/language-mode-toggle";
import { ModeToggle } from "@/components/header/mode-toggle";
import { UserSettingsDropdown } from "@/components/header/user-settings-dropdown";
import { useTranslation } from "react-i18next";

const AppHeader = () => {
  const { t } = useTranslation();

  return (
    <nav className="flex h-14 items-center gap-5 bg-white p-5 shadow-md">
      <div className="flex-1 text-4xl">
        <span className="font-bold text-blue-600">{t("peer")}</span>
        <span className="font-bold text-black">{t("pulse")}</span>
      </div>
      <div className="flex-none">User</div>
      <LanguageModeToggle />
      <ModeToggle />
      <UserSettingsDropdown />
    </nav>
  );
};

export default AppHeader;
