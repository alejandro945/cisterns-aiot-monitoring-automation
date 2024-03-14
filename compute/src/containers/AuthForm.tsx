"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AUTH_PAGE } from "@/constants/auth.constants"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export const AuthForm = ({ className, ...props }: UserAuthFormProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            {/* Local Authentication */}
            <form onSubmit={onSubmit}>
                <div className="grid gap-6">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            {AUTH_PAGE.form.email}
                        </Label>
                        <Input
                            id="email"
                            placeholder={AUTH_PAGE.form.placeholder}
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {AUTH_PAGE.form.localButton}
                    </Button>
                </div>
            </form>
            {/* SSO Integration */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        {AUTH_PAGE.form.ssoTitle}
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                {AUTH_PAGE.form.ssoGithubBtn}
            </Button>
        </div>
    )
}