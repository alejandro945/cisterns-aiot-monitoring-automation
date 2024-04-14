import * as React from "react"

import { AUTH_PAGE } from "@/presentation/constants/auth.constants"
import SignInForm from "../client/SignInForm"


export const SignIn = () => {
    return (
        <div className={"grid gap-6"}>
            {/* Title and Description */}
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {AUTH_PAGE.right.signIn.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {AUTH_PAGE.right.signIn.subtitle}
              </p>
            </div>

            {/* Local Authentication */}
            <SignInForm />

        </div>
    )
}