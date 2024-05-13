import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { NAVOPTIONS } from "@/presentation/constants/menu.constants"
import Link from "next/link"
import { Wrapper } from "./client-wrapper"
import { auth } from "@/application/auth"


export async function UserNav() {
  const session = await auth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image || '/avatars/01.png'} alt="Avatar" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none"> {session?.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* Profile */}
          <Link href={NAVOPTIONS[0].link}>
            <DropdownMenuItem >
              {NAVOPTIONS[0].label}
              <DropdownMenuShortcut>{NAVOPTIONS[0].shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          {/* Settings */}
          <Link href={NAVOPTIONS[1].link}>
            <DropdownMenuItem>
              {NAVOPTIONS[1].label}
              <DropdownMenuShortcut>{NAVOPTIONS[1].shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* Log out */}
        <Wrapper>
            <DropdownMenuItem>
              {NAVOPTIONS[2].label}
              <DropdownMenuShortcut>{NAVOPTIONS[2].shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
        </Wrapper>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}