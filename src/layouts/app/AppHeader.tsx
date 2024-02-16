import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppHeader = () => {
  return (
    <nav className="bg-white shadow-md h-14 p-5 flex items-center gap-5">
      <div className="flex-1 text-4xl">
        <span className="font-bold text-blue-600">Peer</span>
        <span className="font-bold text-black">Pulse</span>
      </div>
      <div className="flex-none">User</div>
      <ModeToggle />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default AppHeader;
