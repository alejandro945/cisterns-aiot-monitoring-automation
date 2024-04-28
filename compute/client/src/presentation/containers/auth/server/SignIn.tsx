import * as React from "react"

import { AUTH_PAGE } from "@/presentation/constants/auth.constants"
import SubmitButton from "@/presentation/components/common/submit-button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form"
import { useFormState } from "react-dom"
import { UserActions } from "@/application/actions/user-actions"
import { Input } from "@/presentation/components/ui/input"


export const SignIn = () => {
  const [errorMessage, dispatch] = useFormState(UserActions.authUser, undefined);
  console.log(errorMessage)

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

      {/* Form */}
      <form action={dispatch} className="space-y-8">

        {/* Email */}
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{AUTH_PAGE.right.signIn.form.email}</FormLabel>
              <FormControl>
                <Input placeholder={AUTH_PAGE.right.signIn.form.emailPlaceholder} {...field} />
              </FormControl>
              <FormDescription> {AUTH_PAGE.right.signIn.form.emailDescription} </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{AUTH_PAGE.right.signIn.form.password}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={AUTH_PAGE.right.signIn.form.passwordPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Client side Component */}
        <SubmitButton text={AUTH_PAGE.right.signIn.form.localButton} />

        {/* Error Server Message */}
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true" >
          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p> }
        </div>

      </form>
    </div>
  )
}