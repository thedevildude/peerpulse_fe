import { LanguageModeToggle } from "@/components/language-mode-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default AppHeader;
