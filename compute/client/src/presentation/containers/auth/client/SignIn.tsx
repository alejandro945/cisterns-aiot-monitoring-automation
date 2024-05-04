'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form'
import { AuthFormValues, AuthSchema } from '@/application/validations/auth-validations'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { AUTH_PAGE } from '@/presentation/constants/auth.constants'
import { Input } from '@/presentation/components/ui/input'
import { Button } from '@/presentation/components/ui/button'
import { UserClientActions } from '@/application/actions/client/user-actions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import Providers from './Providers'

export const SignIn: React.FC<{ handleChangePanel: () => void }> = ({ handleChangePanel }) => {
  const form = useForm<AuthFormValues>({ resolver: zodResolver(AuthSchema) })

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">{AUTH_PAGE.right.signIn.title}</CardTitle>
        <CardDescription>
          {AUTH_PAGE.right.signIn.subtitle}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(UserClientActions.authUser)} className="space-y-8">
          <CardContent className="grid gap-4">
            <Providers />
            <FormField
              control={form.control}
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
            <FormField
              control={form.control}
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
          </CardContent>
          <CardFooter className="gap-6">
            <Button className="w-full" variant='secondary' onClick={handleChangePanel}>{AUTH_PAGE.right.signIn.form.dontHaveAccount}</Button>
            <Button type="submit" className="w-full">{AUTH_PAGE.right.signIn.form.localButton}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
