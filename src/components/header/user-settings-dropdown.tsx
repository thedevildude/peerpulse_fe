import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export function UserSettingsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
          <span className="sr-only">t{"user-settings-dropdown"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex">
        <DropdownMenuItem>
          <Link to="/profile" className="flex flex-col items-center">
            <User className="h-8 w-8" />
            <p>Profile</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Preferences</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
