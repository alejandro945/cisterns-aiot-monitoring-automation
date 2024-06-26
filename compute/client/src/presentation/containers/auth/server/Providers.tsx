import { Button } from "@/presentation/components/ui/button"
import { Icons } from "@/presentation/components/ui/icons"
import { AUTH_PAGE } from "@/presentation/constants/auth.constants"
import { signIn } from "next-auth/react"

export const Providers = () => {
    return (
        <>
            <div className="grid grid-cols-2 gap-6">
                <Button variant="outline" type="button" onClick={() => signIn('github')}>
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    {AUTH_PAGE.right.sso.providers[0]}
                </Button>
                <Button variant="outline" type="button" onClick={() => signIn('google')}>
                    <Icons.google className="mr-2 h-4 w-4" />
                    {AUTH_PAGE.right.sso.providers[1]}
                </Button>
            </div>
            <div className="relative">
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        {AUTH_PAGE.right.sso.title}
                    </span>
                </div>
            </div>
        </>
    )
}
