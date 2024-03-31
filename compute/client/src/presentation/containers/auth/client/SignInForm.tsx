'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form'
import { AuthFormValues, AuthSchema } from '@/application/validations/auth-validations'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { AUTH_PAGE } from '@/presentation/constants/auth.constants'
import { Input } from '@/presentation/components/ui/input'
import { Button } from '@/presentation/components/ui/button'
import {signIn} from 'next-auth/react'
import { useSession } from 'next-auth/react'

const onSubmitForm = async (data: any) => {
  try {
    const response = await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/dashboard",
    })
    
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

const SignInForm = () => {
  const form = useForm<AuthFormValues>({ resolver: zodResolver(AuthSchema) })
  const {data: session, status} = useSession();
  console.log("status", status);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
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