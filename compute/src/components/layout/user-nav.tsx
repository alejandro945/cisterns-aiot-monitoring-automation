import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { MENU } from "@/constants/menu.constants"
import Link from "next/link"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* Profile */}
          <Link href={MENU[0].link}>
            <DropdownMenuItem >
              {MENU[0].label}
              <DropdownMenuShortcut>{MENU[0].shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          {/* Settings */}
          <Link href={MENU[1].link}>
            <DropdownMenuItem>
              {MENU[1].label}
              <DropdownMenuShortcut>{MENU[1].shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* Log out */}
        <Link href={MENU[1].link}>
          <DropdownMenuItem>
            {MENU[2].label}
            <DropdownMenuShortcut>{MENU[2].shortcut}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}