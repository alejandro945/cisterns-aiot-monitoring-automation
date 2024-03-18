'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AuthenticateFormValues, AuthenticateUserSchema } from '@/validations/auth-validations'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { AUTH_PAGE } from '@/constants/auth.constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AuthService } from '@/services/auth-service'

const SignInForm = () => {
  const form = useForm<AuthenticateFormValues>({ resolver: zodResolver(AuthenticateUserSchema) })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(AuthService.authenticateUser)} className="space-y-8">
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
        <Button type="submit">{AUTH_PAGE.right.signIn.form.localButton}</Button>
      </form>
    </Form>
  )
}

export default SignInForm