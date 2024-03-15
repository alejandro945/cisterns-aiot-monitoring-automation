import Link from "next/link"

import { cn } from "@/lib/utils"
import { MENU } from "@/constants/menu.constants"

export function MenuOptions({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {MENU.slice(3).map((item) => (
        <Link key={item.label} href={item.link} className="text-sm font-medium transition-colors hover:text-primary">
            {item.label}
        </Link>
      ))}
    </nav>
  )
}