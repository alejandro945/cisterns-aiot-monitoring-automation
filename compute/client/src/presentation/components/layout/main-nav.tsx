import Link from "next/link"

import { cn } from "@/presentation/lib/utils"
import { MENU, MENUWITHOUTSUBSCRIPTION } from "@/presentation/constants/menu.constants"
import { auth } from "@/application/auth"
import { getLastPayment } from "@/infrastructure/gateway/payment-gateway"

export async function MenuOptions({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const isGreenLake = process.env.GREEN_LAKE === 'true'
  const session = await auth()
  const lastPayment = isGreenLake ? await getLastPayment(session?.user?.id || '') : null
  const menu = isGreenLake ? (lastPayment ? MENU : MENUWITHOUTSUBSCRIPTION) : MENU;
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {menu.map((item) => (
        <Link key={item.label} href={item.link} className="text-sm font-medium transition-colors hover:text-primary">
            {item.label}
        </Link>
      ))}
    </nav>
  )
}